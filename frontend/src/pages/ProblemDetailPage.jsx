import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router";
import { PROBLEMS } from "../data/problem.js";
import { NavBar } from "../components"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ProblemDescription, OutputPanel, CodeEditorPanel } from "../components";
import { executeCode } from "../lib/pistonapi.js"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

function ProblemDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];


    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

const triggerConfetti=()=>{
    confetti({
        particleCount:80,
        spread:250,origin:{x:0.2,y:0.6}
    }),
    confetti({
        particleCount:80,
        spread:250,
        origin:{
            x:0.8,
            y:0.6
        }
    })
}
    const handleProblemChange = (newProblemId) => { navigate(`/problems/${newProblemId}`) };
    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode.newLang)
    };

    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const n_actualCode = normalizeOutput(actualOutput);
        const n_expectedCode = normalizeOutput(expectedOutput);

        return n_actualCode===n_expectedCode

    }
    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);
        const result = await executeCode(selectedLanguage, code);
        console.log("result",result)
        setOutput(result);
        setIsRunning(false);

        //check if result is success or correct

        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testPassed = checkIfTestsPassed(result.output, expectedOutput);
            console.log("testPassed", testPassed)

            if (testPassed) { triggerConfetti();toast.success("All test Passed Great Job!") }
            else { toast.error("Test failed. Check Your Output"); }
        }else{
            toast.error("Code execution Failed!")
        }
    };







    return (
        <div className="h-screen bg-base-100 flex flex-col">
            <NavBar />
            <div className="flex-1">
                <PanelGroup direction='horizontal'>
                    {/* Left Panel-problemDescription */}
                    <Panel defaultSize={40} minSize={25}>
                        <ProblemDescription
                            problem={currentProblem}
                            currentProblemId={currentProblemId}
                            onProblemChange={handleProblemChange}
                            allProblems={Object.values(PROBLEMS)}

                        />
                    </Panel>

                    {/* Resizable Handler */}
                    <PanelResizeHandle className='w-2 bg-base-200 hover:bg-primary transition-colors cursor-col-resize' />

                    {/* Left Panel  */}
                    <Panel defaultSize={60} minSize={40}>
                        <PanelGroup direction='vertical'>
                            {/* Top panel - Code editor */}
                            <Panel defaultSize={30} minSize={30}>
                                <CodeEditorPanel
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                            {/* Bottom panel - Output Panel*/}

                            <Panel defaultSize={70} minSize={30}>
                                <OutputPanel output={output} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
        
    )
}

export default ProblemDetailPage
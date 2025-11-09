import { Code2Icon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

export const getDifficultyBadgeClass = (difficulty = "") => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "badge-success";
        case "medium":
            return "badge-warning";
        case "hard":
            return "badge-error";
        default:
            return "badge-ghost";
    }

}

function ProblemCard(
    {
        problemId,
        problemTitle,
        problemDifficulty,
        problemCategory,
        problemDescriptionText
    }
) {
    return (
        <Link key={problemId} to={`/problem/${problemId}`} className="card bg-base-100 hover:scale-[1.01] transition-transform" >
            <div className="card-body">
                <div className="flex items-center justify-between gap-4">

                    {/*Left Side*/}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Code2Icon className="size-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-xl font-bold">{problemTitle}</h2>
                                    <span className={`badge ${getDifficultyBadgeClass(problemDifficulty)}`}>
                                        {problemDifficulty}
                                    </span>
                                </div>
                                <p className="text-sm text-base-content/60"> {problemCategory}</p>
                            </div>
                        </div>
                        <p className="text-base-content/80 mb-3">{problemDescriptionText}</p>
                    </div>
                    {/* Right Side */}
                    <div className="flex items-center gap-2 text-primary">
                        <span className="font-medium">Solve</span>
                        <ChevronRightIcon className="size-5" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProblemCard
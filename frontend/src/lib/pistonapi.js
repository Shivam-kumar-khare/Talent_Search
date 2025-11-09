
// const getExtension = (language) => {
//     switch (language.toLowerCase()) {
//         case "javascript":
//             return ".js"
//         case "python":
//             return ".py"
//         case "java":
//             return ".java"
//         default:
//             return ".txt"
//     }
// }

// const PISTON_API = "https://emkc.org/api/v2/piston";

// const LANGUAGE_VERSIONS = {
//     javascript: {
//         language: "javascript",
//         version: "18.15.0"
//     },
//     python: {
//         language: "python",
//         version: "3.10.0"
//     },
//     java: {
//         language: "java",
//         version: "15.0.2"
//     },
// }

// export async function executeCode(language, src_code) {
//     try {
//         console.log("src_code", src_code)
//         const languageConfig = LANGUAGE_VERSIONS[language.trim().toLowerCase()];
//         if (!languageConfig) return { success: false, error: "Unsupported Language" };


//         const response = await fetch(`${PISTON_API}/execute`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 language: languageConfig.language,
//                 version: languageConfig.version,
//                 files: [
//                     {
//                         name: `main${getExtension(language)}`,
//                         content: src_code
//                     }
//                 ]

//             })
//         })
//         console.log("response=", response)

//         if (!response.ok) {
//             return {
//                 success: false,
//                 error: "HTTP error! status :" + response.status.toString()
//             }
//         }

//         const data = await response.json();
//         console.log("data=", data)
//         const output = data.run.output || data.run.stdout || "";
//         const stderr = data.run.stderr || false;

//         const isMeaningfulOutput =
//             output.trim() !== "" &&
//             !/^undefined(\s*undefined)*$/i.test(output.trim());

//         if (stderr.trim()) {
//             return { success: false, output, error: stderr };
//         }

//         if (!isMeaningfulOutput) {
//             return { success: false, output: "No valid output produced." };
//         }
//         return {
//             success: true,
//             output: output || "No Output"
//         }

//     } catch (error) {
//         return {
//             success: false,
//             error: "Error Running Code " + error.message.toString()
//         }

//     }


// }


const getExtension = (language) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return ".js";
    case "python":
      return ".py";
    case "java":
      return ".java";
    default:
      return ".txt";
  }
};

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: {
    language: "javascript",
    version: "18.15.0",
  },
  python: {
    language: "python",
    version: "3.10.0",
  },
  java: {
    language: "java",
    version: "15.0.2",
  },
};

export async function executeCode(language, src_code) {
  try {
    console.log("src_code", src_code);
    const languageConfig = LANGUAGE_VERSIONS[language.trim().toLowerCase()];
    if (!languageConfig)
      return { success: false, error: "Unsupported Language" };

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main${getExtension(language)}`,
            content: src_code,
          },
        ],
      }),
    });

    console.log("response=", response);

    if (!response.ok) {
      return {
        success: false,
        error: "HTTP error! status :" + response.status.toString(),
      };
    }

    const data = await response.json();
    console.log("data=", data);

    // ✅ Always convert to string to avoid `.trim()` errors
    const output = String(data.run.output || data.run.stdout || "");
    const stderr = String(data.run.stderr || "");

    const isMeaningfulOutput =
      output.trim() !== "" &&
      !/^undefined(\s*undefined)*$/i.test(output.trim());

    if (stderr.trim()) {
      return { success: false, output, error: stderr };
    }

    if (!isMeaningfulOutput) {
      return { success: false, output: "No valid output produced." };
    }

    return {
      success: true,
      output: output.trim() || "No Output",
    };
  } catch (error) {
    return {
      success: false,
      error: "Error Running Code " + error.message.toString(),
    };
  }
}

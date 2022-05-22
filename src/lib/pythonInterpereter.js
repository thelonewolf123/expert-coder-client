async function runPythonCode(code, stdin, fileName) {
    let result = await fetch(process.env.VUE_APP_PYTHON_API_URL, {
        body: JSON.stringify({
            code: code,
            stdin: stdin,
            fileName: fileName
        }),
        method: 'POST'
    });

    let resultJson = result.json();
    return resultJson;
}

export default runPythonCode;
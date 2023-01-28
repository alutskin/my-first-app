const usePrompt = (text, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(prompt(text));
        }, delay);
    });
};

export default usePrompt;

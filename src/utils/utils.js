const setPrismaArgs = (options = {}) => {
    const args = {}
    if (options.select) {
        const select = {};
        options.select.forEach(field => {
            select[field] = true; 
        });
        args.select = select;
    }

    return args;
}

export {
    setPrismaArgs
}
const useDateUtils = () => {

    const parseDate = (date: string, format: string) => {
        let accepted = /([m].+[d].+[y])|([m].+[y].+[d])|([y].+[m].+[d])|([y].+[d].+[m])|([d].+[m].+[y])|([d].+[y].+[m])/gi

        accepted.exec(format)
    }

    return {
        parseDate
    }
}

export default useDateUtils
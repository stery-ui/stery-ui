const getFormat = (input: string, format: string) => {
  let segments: any = [];

  function getMonthSegment(format: string) {
    const longMonth = new RegExp("m{3}", "i");

    const shortMonth = new RegExp("m{2}", "i");

    const numMonth = new RegExp("m{1}", "i");

    let match = null;

    match = longMonth.exec(format);
    if (match) {
      segments[match.index] = {
        type: "month",
        format: "long",
        length: 3,
        index: match.index,
      };
      return;
    }

    match = shortMonth.exec(format);
    if (match) {
      segments[match.index] = {
        type: "month",
        format: "short",
        length: 2,
        index: match.index,
      };
      return;
    }

    match = numMonth.exec(format);
    if (match) {
      segments[match.index] = {
        type: "month",
        format: "number",
        length: 1,
        index: match.index,
      };
      return;
    }
  }

  function getDaySegment(format: string) {
    const longDay = new RegExp("d{3}", "i");

    const shortDay = new RegExp("d{2}", "i");

    const numDay = new RegExp("d{1}", "i");

    let match = null;

    match = longDay.exec(format);
    if (match) {
      segments[match.index] = {
        type: "day",
        format: "long",
        length: 3,
        index: match.index,
      };
      return;
    }

    match = shortDay.exec(format);
    if (match) {
      segments[match.index] = {
        type: "day",
        format: "short",
        length: 2,
        index: match.index,
      };
      return;
    }

    match = numDay.exec(format);
    if (match) {
      segments[match.index] = {
        type: "day",
        format: "number",
        length: 1,
        index: match.index,
      };
      return;
    }
  }

  function getYearSegment(format: string) {
    const longYear = new RegExp("y{4}", "i");

    const shortYear = new RegExp("y{2}", "i");

    const numYear = new RegExp("y{1}", "i");

    let match = null;

    match = longYear.exec(format);
    if (match) {
      segments[match.index] = {
        type: "year",
        format: "long",
        length: 4,
        index: match.index,
      };
      return;
    }

    match = shortYear.exec(format);
    if (match) {
      segments[match.index] = {
        type: "year",
        format: "short",
        length: 2,
        index: match.index,
      };
      return;
    }

    match = numYear.exec(format);
    if (match) {
      segments[match.index] = {
        type: "year",
        format: "long",
        length: 1,
        index: match.index,
      };
      return;
    }
  }

  getMonthSegment(format);
  getDaySegment(format);
  getYearSegment(format);
  // console.log(segments)

  //  match = matchMonth.exec('MMM/DD/YYYY')

  // ([0][1-9]|[1][0-2]|[0,1]{1})
  let matchMonths = "01|[0][1-9]|[1][0-2]*";

  let matchDays = "01|[0-2][1-9]|[1-2][0-2]|[3][0-1]*";

  let matchYears = "[0-9]{4}*";

  let matchSeparator = "[\/\-\.\~\ \,]*";

  // console.log('02.13.2022'.match(`^(${matchMonths}).(${matchDays}).(${matchYears})`))
  // console.log(new RegExp("[~._ -/]{1}[~._ -/]{1}").exec('asdfasd/~. -.~_^'))
  // for(let i = 1990; i < 2035; i++) {
  //     let num = i.toString()
  //     if(i < 10) {
  //         num = `0${i}`
  //     }
  //     console.log(num.match("^([0-9]{4})"))
  // }
  let matcher = "^";
  // console.log
  segments.forEach((segment: any, i: number) => {
    if (segment.type === "month") {
      matcher += `(${matchMonths})`;
      format = format.toLowerCase().replace("mm", `(${matchMonths})`);
    }
    if (segment.type === "day") {
      matcher += `(${matchDays})`;
      format = format.toLowerCase().replace("dd", `(${matchDays})`);
      format = format.toLowerCase().replace("d", `(${matchDays})`);
    }
    if (segment.type === "year") {
      matcher += `(${matchYears})`;
      format = format.toLowerCase().replace("yyyy", `(${matchYears})`);
    }

    // if(matcher.indexOf(matchSeparator) && i <= segments.length - 2) {
    //     matcher += `(${matchSeparator})`
    // }

    // matcher += `-`
    // let separators = format.match(`([~\._ -\/]).*.([~\._ -\/])`)
    // if(separators) {
    //     separators.forEach((separator: string) => {
    //         console.log(separator.match(`([~\._ -\/])`))
    //         console.log()
    //         // if(matcher.indexOf(`(${separator})`) < 0) {
    //         //     matcher += `(${separator})`
    //         // }
    //     })
    // }
  });

  format = "^" + format
  console.log(input.match(format), format)
  if (input != null && input.match(format)) {
    return input.match(format)[0];
  }
  return input
};

export const dateFormat = (str: string, format: string) => {
  console.log(str)
  return getFormat(str, format);
};

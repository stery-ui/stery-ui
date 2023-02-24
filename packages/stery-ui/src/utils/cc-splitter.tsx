export const splitCardNumber = (str?: string) => {
  if (typeof str === "undefined") {
    return "";
  }
  let x = str.match(/([\d]{1,4})/g);

  if (x != null) {
    return x.join(" ").trim();
  }

  return '';
};

export const splitExpiry = (str?: string) => {
    
  if (typeof str === "undefined") {
    return "";
  }
  let x = str.match(/([\d]{1,2})/g);

  if (x != null) {
    return x.join("/").trim();
  }

  return '';

}

export const numericEntry = (str?: string) => {

  if (typeof str === "undefined") {
    return "";
  }
  let x = str.match(/([\d]{1,4})/g);

  if (x != null) {
    return x.join().trim();
  }

  return '';
}
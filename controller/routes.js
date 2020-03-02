const axios = require("axios");
const dns = require("dns");

exports.findtag = async (req, res) => {
  try {
    const resp = await axios.get(req.query.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "Content-Type": "text/html",
        Accept: "*/*"
      }
    });
    let regex = `<meta.*?${req.query.attr || "name"}=\\"${
      req.query.tag
    }\\".*?content=\\"(.*?)\\".*?>`;
    regex = new RegExp(regex);
    const data = await resp.data.match(regex);
    if (!data) {
      return res.status(400).json({
        success: false,
        data: "tag not found"
      });
    }
    res.status(200).json({ success: true, data: data[1] });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.finddns = (req, res) => {
  const str = ["http://", "https://", "www."];
  let url = req.query.url;
  str.forEach(ele => {
    url = url.replace(ele, "");
  });
  dns.resolveTxt(url, (err, data) => {
    if (!data) {
      return res
        .status(400)
        .json({ success: false, err: "something went wrong" });
    }
    const found = data.find(ele => ele.includes(req.query.dnstext));
    if (!found) {
      return res.status(400).json({ success: false, err: "record not found" });
    }
    res.status(200).json({ success: true, data: found });
  });
};

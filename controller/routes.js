const axios = require("axios");

exports.findtag = async (req, res) => {
  try {
    const resp = await axios.get(req.query.url);
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

exports.finddns = async (req, res) => {
  try {
    const str = ["http://", "https://", "www."];
    let url = req.query.url;
    str.forEach(ele => {
      url = url.replace(ele, "");
    });
    const data = await axios.get(
      `https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_cf19tw1AtNVCuljqvTRUQwCsmZzNr&domainName=${url}&type=TXT&outputFormat=JSON`
    );
    if (data.data.ErrorMessage) {
      return res
        .status(400)
        .json({ success: false, err: data.data.ErrorMessage.msg });
    }
    const records = data.data.DNSData.dnsRecords;
    const found = records.find(ele => ele.strings.includes(req.query.dnstext));
    if (!found) {
      return res.status(400).json({ success: false, err: "record not found" });
    }
    res.status(200).json({ success: true, data: found });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

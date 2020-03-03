# overview

this app lets you check the whether the meta tag available on the website and it allows you to check the dns text record present or not in the domain

# Application

Link to app https://harish-task.herokuapp.com/

## installation

```
npm install
node index.js
```

## working

app provides two end points :

- /meta

http://localhost:5000/meta?url=yoururl&tag=tagname

url = any url,

tag = meta tag name,

attr = by default it is set to name if you want to change you can change it by passing a value to it

example -

http://localhost:5000/meta?url=https://www.cricbuzz.com/&tag=description

```
{
success: true,
data: "Get Live Cricket Score, Scorecard, Schedules of International and Domestic cricket matches along with Latest News, Videos and ICC Cricket Rankings of Players on Cricbuzz.",
}
```

http://localhost:5000/meta?url=https://www.reddit.com/&tag=og:url&attr=property

```
{
success: true,
data: "https://www.reddit.com/",
}
```

- /dns

returns txt record if present with success is set to true

http://localhost:5000/dns?url=domain&dnstext=textrecord

url = url of your domain

dnstext = pass txt record you want to verify

example -

http://localhost:5000/dns?url=google.com&dnstext=facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95

```
{
success: true,
data: [
"facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"
],
}
```

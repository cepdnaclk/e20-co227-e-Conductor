
  } else if (type === "Trans3") {
    console.log(`new request: ${JSON.stringify(data)}`);
    res.json("0000025");
  } else if (type === "Trans4") {
    console.log(`new request: ${JSON.stringify(data)}`);
    res.json("success");
  }
});
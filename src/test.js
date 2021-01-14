const { handler } = require("./index");

let event_json_post = {
  requestContext: {
    elb: {
      targetGroupArn:
        "arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a"
    }
  },
  httpMethod: "POST",
  path: "/lambda",
  queryStringParameters: {},
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "content-type": "application/json",
    "accept-encoding": "gzip",
    "accept-language": "en-US,en;q=0.9",
    connection: "keep-alive",
    host: "lambda-alb-123578498.us-east-2.elb.amazonaws.com",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "x-amzn-trace-id": "Root=1-5c536348-3d683b8b04734faae651f476",
    "x-forwarded-for": "72.12.164.125",
    "x-forwarded-port": "80",
    "x-forwarded-proto": "http",
    "x-imforwards": "20"
  },
  body: '{"estimated_population":"11858"}',
  isBase64Encoded: false
};

let event_json_get = {
  requestContext: {
    elb: {
      targetGroupArn:
        "arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a"
    }
  },
  httpMethod: "GET",
  path: "/lambda",
  queryStringParameters: {
    estimated_population: "11858"
  },
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "content-type": "application/json",
    "accept-encoding": "gzip",
    "accept-language": "en-US,en;q=0.9",
    connection: "keep-alive",
    host: "lambda-alb-123578498.us-east-2.elb.amazonaws.com",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "x-amzn-trace-id": "Root=1-5c536348-3d683b8b04734faae651f476",
    "x-forwarded-for": "72.12.164.125",
    "x-forwarded-port": "80",
    "x-forwarded-proto": "http",
    "x-imforwards": "20"
  },
  body: "",
  isBase64Encoded: false
};

describe("basic tests", () => {
  test("handler function exists", () => {
    expect(typeof handler).toBe("function");
  });

  test("405 Method Not Allowed empty event Test", async () => {
    const data = await handler();
    expect(data).toStrictEqual({ body: "Method Not Allowed", statusCode: 405 });
  });

  test("Proper POST Message Test", async () => {
    const data = await handler(event_json_post);
    expect(data).toStrictEqual({
      body:
        '[{"zip":"01118","type":"STANDARD","primary_city":"Springfield","acceptable_cities":null,"unacceptable_cities":"Spfld","state":"MA","county":"Hampden County","timezone":"America/New_York","area_codes":"413","latitude":"42.11","longitude":"-72.53","country":"US","estimated_population":"11858"}]',
      statusCode: 200
    });
  });

  test("Proper GET Message Test", async () => {
    const data = await handler(event_json_get);
    expect(data).toStrictEqual({
      body:
        '[{"zip":"01118","type":"STANDARD","primary_city":"Springfield","acceptable_cities":null,"unacceptable_cities":"Spfld","state":"MA","county":"Hampden County","timezone":"America/New_York","area_codes":"413","latitude":"42.11","longitude":"-72.53","country":"US","estimated_population":"11858"}]',
      statusCode: 200
    });
  });
  test("405 Method Not Allowed Test without proper content-type", async () => {
    event_json_get["headers"]["content-type"] = "content test";
    const data = await handler(event_json_get);
    expect(data).toStrictEqual({ body: "Method Not Allowed", statusCode: 405 });
  });

  test("500 Internal Server Error", async () => {
    event_json_post["body"] = "testing if 500 is getting displayed or not";
    const data = await handler(event_json_post);
    expect(data).toStrictEqual({
      body: "Internal Server Error",
      statusCode: 500
    });
  });
});

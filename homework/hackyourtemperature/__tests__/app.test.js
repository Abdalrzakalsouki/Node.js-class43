import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /", () => {
  it("Pass wrong endpoint", async () => {
    const res = await request.post("/crazyEndpoint");
    expect(res.status).toBe(404);
  });

  it("Pass valid city to external API", async () => {
    const validCity = "Budapest";
    const res = await request
      .post("/weather")
      .send({ cityName: `${validCity}` });
    expect(res.status).toBe(200);
    expect(typeof res.text).toBe("string");
    expect(res.text).toMatch(
      new RegExp(/City:\s[A-za-z]*,\sTemperature:\s[0-9]{3}.[0-9]{1,2}/g)
    );
  });

  it("Pass invalid city to external API", async () => {
    const invalidCity = "Cologeneysa";
    const res = await request
      .post("/weather")
      .send({ cityName: `${invalidCity}` });
    expect(res.status).toBe(200);
    expect(typeof res.text).toBe("string");
    expect(res.text).toMatch("City is not found!");
  });

  it("Pass empty string", async () => {
    const res = await request.post("/weathe").send();
    expect(res.status).toBe(404);
    expect(typeof res.text).toBe("string");
    expect(res.text).toContain("Error");
  });
});

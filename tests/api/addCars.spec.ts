import { test } from "@playwright/test";

test.describe("API requests", async () => {
  test.beforeEach(
    "User is logged via the API authorization",
    async ({ request }) => {
      const authRequest = await request.post("/api/auth/signin", {
        data: {
          email: "okozoriz@allvuesystems.com",
          password: "zeB3ixNryhyQ074",
          remember: true,
        },
      });
      //console.log(await authRequest.json());
    }
  );
  test("User gets all cars", async ({ request }) => {
    const car = await request.get("/api/cars/");
    const body = await car.json();
    console.log(await body);
  });

  test("Negative test - mileage has to be from 0 to 999999", async ({
    request,
  }) => {
    const car = await request.post("/api/cars/", {
      data: {
        carBrandId: 13,
        carModelId: 25,
        mileage: 123456789,
      },
    });
    const body = await car.json();
    console.log(await body);
  });
  test("Negative test - Brand not found", async ({ request }) => {
    const car = await request.post("/api/cars/", {
      data: {
        carBrandId: 13,
        carModelId: 25,
        mileage: 12500,
      },
    });
    const body = await car.json();
    console.log(await body);
  });
  test("User can post a car successfully", async ({ request }) => {
    const car = await request.post("/api/cars/", {
      data: {
        carBrandId: 3,
        carModelId: 12,
        mileage: 23892,
      },
    });
    const body = await car.json();
    console.log(await body);
  });
});

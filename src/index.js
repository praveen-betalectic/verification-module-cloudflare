export default {
  async fetch(request, env, ctx) {
    // const neptune = require("@teurons/neptune-nodejs");
    const { pathname } = new URL(request.url);
    if (pathname == "/set-verify") {
      let data = await request.json();

      let existingData = await env.VERIFICATION_TOKENS.get(data.email);

      if (existingData !== null) {
        await env.VERIFICATION_TOKENS.delete(data.email);
      }

      let value = JSON.stringify({
        token: data.token,
        created_at: data.created_at,
        expaires_at: data.expaires_at,
      });

      await env.VERIFICATION_TOKENS.put(data.email, value);

      let eventType = "send_verification_token";

      const payload = JSON.stringify({
        event_type: eventType,
        environment: "dev",
        api_token:
          "eyJhbGciOiJFZERTQSJ9.eyJleHAiOjE3MDc4Mjg2MzcsInN1YiI6ImFkMmExMDg3LTY5ODktNGNkYi05ZDkwLTAzYWM1OGFkYTYyYiIsImlzcyI6InRlYW0iLCJqdGkiOiI3NWEwNWRiOC1kNjNiLTRlMTctYTk5NC05ZTFjNGJlODUyMGEifQ.iQVbJwb7y2RtZ0pY_xWUQGt6qLuzeml58aBXaR89RRc61-AWRw6UqCBz0fWHuaNQkDfhRYvBcnCdb0p1WhSjBQ",
        version: "1",
        data: {
          otp: data.token,
        },
        user_id: "123-256-33456",
        contact_infos: [{ type: "email", value: data.email }],
      });

      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      };

      await fetch(
        "https://edge.teurons.com/neptune/events/ingest",
        requestOptions
      );

      return new Response("verification added successfully");
      // return new Response(JSON.stringify(result), {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // });
    } else if (pathname == "/do-verify") {
      const params = {};
      const url = new URL(request.url);
      const queryString = url.search.slice(1).split("&");

      const dateTime = new Date(
        new Date().toLocaleString("en", { timeZone: "Asia/Kolkata" })
      );

      queryString.forEach((item) => {
        const kv = item.split("=");
        if (kv[0]) params[kv[0]] = kv[1] || true;
      });

      let data = await env.VERIFICATION_TOKENS.get(params.email);
      let verificationToken = JSON.parse(data);

      const expTime = new Date(verificationToken.expaires_at);

      if (dateTime < expTime) {
        if (params.token == verificationToken.token) {
          return new Response("Verification Successfull");
        }
        return new Response("Invalid Token");
      } else {
        return new Response("Token expired");
      }
    } else {
      return new Response("Route Not Found");
    }
  },
};

import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    throw new Error("No code provided");
  }

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await response.json();

  const athleteName = [tokens.athlete.firstname, tokens.athlete.lastname]
    .filter(Boolean)
    .join(" ");

  const redirectUrl = `/tokens?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&scope=activity:read_all,profile:read_all&token_type=${tokens.token_type}&approval_prompt=force&user_id=${tokens.athlete.id}&profile=${tokens.athlete.profile}&name=${athleteName}`;

  return redirect(redirectUrl);
}

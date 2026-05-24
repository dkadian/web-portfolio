import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const username = "dkadian";

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "GitHub Token not configured" }, { status: 500 });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API Errors:", data.errors);
      return NextResponse.json({ error: data.errors[0].message }, { status: 500 });
    }

    if (!data.data?.user) {
      return NextResponse.json({ error: "User not found or data missing" }, { status: 404 });
    }

    const calendarData = data.data.user.contributionsCollection.contributionCalendar;

    return NextResponse.json(calendarData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: unknown) {
    console.error("GitHub API Route Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage, details: String(error) }, { status: 500 });
  }
}

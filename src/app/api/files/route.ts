import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { DATABASE_PATH } from "@/constants/path";

export async function POST(request: NextRequest) {
  try {
    const { userId, name, fileAlias, fileDesc } = await request.json();
    
    if (!userId || !name || !fileAlias) {
      return NextResponse.json(
        { error: "userId, name, and fileAlias are required" },
        { status: 400 }
      );
    }

    // SQLite 데이터베이스 연결
    const db = new sqlite3.Database(DATABASE_PATH);

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO files (userId, name, fileAlias, fileDesc) VALUES (?, ?, ?, ?)`,
        [userId, name, fileAlias, fileDesc || null],
        function (err) {
          if (err) {
            console.error("Database error:", err);
            resolve(
              NextResponse.json(
                { error: "Failed to save file information" },
                { status: 500 }
              )
            );
            return;
          }

          // 생성된 파일 정보 조회
          db.get(
            `SELECT * FROM files WHERE fileId = ?`,
            [this.lastID],
            (err, row) => {
              if (err) {
                console.error("Database error:", err);
                resolve(
                  NextResponse.json(
                    { error: "Failed to retrieve created file" },
                    { status: 500 }
                  )
                );
                return;
              }

              resolve(
                NextResponse.json(row, { status: 200 })
              );
            }
          );
        }
      );
    }).finally(() => {
      db.close();
    });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { error: "Failed to create file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const db = new sqlite3.Database(DATABASE_PATH);
    
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM files WHERE userId = ? ORDER BY createdAt DESC`,
        [userId],
        (err, rows) => {
          if (err) {
            console.error("Database error:", err);
            resolve(
              NextResponse.json(
                { error: "Failed to fetch files" },
                { status: 500 }
              )
            );
            return;
          }

          resolve(
            NextResponse.json(
              { 
                files: rows,
                total: rows.length
              },
              { status: 200 }
            )
          );
        }
      );
    }).finally(() => {
      db.close();
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

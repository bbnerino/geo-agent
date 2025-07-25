import path from 'path';

// 프로젝트 루트 경로
export const ROOT_PATH = process.cwd();

// 데이터베이스 관련 경로
export const DATABASE_DIR = path.join(ROOT_PATH, 'database');
export const DATABASE_PATH = path.join(DATABASE_DIR, 'geo-agent.sqlite'); 
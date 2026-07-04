\# Day 1 PowerShell Commands



\## Enter project folder



```powershell

cd C:\\Users\\Wmj\\Desktop\\deadline-box

Check repository files
Get-ChildItem -Force -Recurse -File | Where-Object { $_.FullName -notmatch '\\.git\\' } | Select-Object -ExpandProperty FullName
Install dependencies
npm install
Run Prisma migration
npx prisma migrate dev
Start development server
npm run dev
Check Git status
git status
Commit Day 1 MVP
git add .
git commit -m "feat: implement day 1 task submission loop"
git push
Stop tracking .env
Add-Content .gitignore "`n.env"
git rm --cached .env
'DATABASE_URL="file:./dev.db"' | Set-Content .env.example
git add .gitignore .env.example
git commit -m "chore: stop tracking local env file"
git push
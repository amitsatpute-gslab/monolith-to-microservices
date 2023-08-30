CYAN=$(tput setaf 6)
normal=$(tput sgr0)
export $(cat .env)
printf "${CYAN}Creating Database\n${normal}"
npm run createDbPg
printf "${CYAN}Database created\n${normal}"

printf "${CYAN}Running migrations\n${normal}"
npm run migratePg
printf "${CYAN}Migration done\n\n${normal}"
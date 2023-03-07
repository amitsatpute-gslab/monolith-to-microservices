CYAN=$(tput setaf 6)
normal=$(tput sgr0)

printf "${CYAN}Creating Database\n${normal}"
npm run createDb
printf "${CYAN}Database created\n${normal}"

printf "${CYAN}Running migrations\n${normal}"
npm run migrate
printf "${CYAN}Migration done\n\n${normal}"
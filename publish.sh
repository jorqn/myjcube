#/bin/bash
rsync -avzh --exclude='.git' --delete ~/Projects/myjcube /var/www/html

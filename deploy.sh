npm run build || exit 1
sudo rsync -avh build/* /var/www/html/app/. --delete
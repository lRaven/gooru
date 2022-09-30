echo "Создаем папки"

sudo cp -R freelance-app/. busines/
sudo cp -R freelance-app/. freelance/
sudo cp -R freelance-app/. blogers/

cd /busines && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=busines" > .env.production && npm i && npm run build cd ..
cd /freelance && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=freelance" > .env.production && npm i && npm run build && cd ..
cd /blogers && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=blogers" > .env.production && npm i && npm run build && cd ..

echo "Done."
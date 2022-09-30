echo "Создаем папки"

sudo cp -R gooru-landing/. busines/
sudo cp -R gooru-landing/. freelance/
sudo cp -R gooru-landing/. blogers/

cd busines/ && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=busines\nVUE_APP_GOORU_FRONTEND=https://compas-goo.ru" > .env.production && cd ..
cd freelance/ && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=freelance\nVUE_APP_GOORU_FRONTEND=https://compas-goo.ru" > .env.production && cd ..
cd blogers/ && echo -e "NODE_ENV=production\nVUE_APP_CONTEXT=blogers\nVUE_APP_GOORU_FRONTEND=https://compas-goo.ru" > .env.production && cd ..

cd blogers/ && sudo npm i && sudo npm run build && cd ..
cd freelance/ && sudo npm i && sudo npm run build && cd ..
cd blogers/ && sudo npm i && sudo npm run build && cd ..

echo "Done."
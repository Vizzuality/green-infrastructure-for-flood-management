echo "Fetching code..."
git checkout master
git fetch --prune
git pull origin master
git merge --no-ff develop

echo "Rebuilding code..."
rm -rf dist
yarn run build

echo "Uploading..."
git add .
git commit -m 'building new version'
git push production master

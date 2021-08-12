while inotifywait -e modify .; do
  cdY ../hardhat-fe && npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile
done

#!/usr/bin/bash


echo "fetching Fe compiler sources from github"
git clone https://github.com/ethereum/fe
echo "git stash in fe/"
cd fe && git stash; cd ..;
echo "preparing sources"
#sed  "1s/^/use serde::\{Serialize, Deserialize\};\nuse serde_json::Value;\n/" fe/crates/driver/src/lib.rs -i
sed  "1s/^/use serde::\{Serialize, Deserialize\};\n/" fe/crates/driver/src/lib.rs -i
sed  "s/pub struct CompiledModule/#\[derive(Serialize, Deserialize)\]\npub struct CompiledModule/" fe/crates/driver/src/lib.rs -i
sed  "s/pub struct CompiledContract/#\[derive(Serialize, Deserialize)\]\npub struct CompiledContract/" fe/crates/driver/src/lib.rs -i
sed  "s/pub enum TokenKind/#\[derive(Serialize, Deserialize)\]\npub enum TokenKind/" fe/crates/parser/src/lexer/token.rs -i
sed  "s/pub struct Token/#\[derive(Serialize, Deserialize)\]\npub struct Token/" fe/crates/parser/src/lexer/token.rs -i
sed  "1s/^/use serde::\{Serialize, Deserialize\};\nuse serde_json::Value;\n/" fe/crates/parser/src/lexer/token.rs -i
sed  "s/^\[dependencies\]/\[dependencies\]\nserde_json = \"1.0\"\n/" fe/crates/parser/Cargo.toml -i
sed  "s/^\[dependencies\]/\[dependencies\]\nserde = \"1.0\"\n/" fe/crates/driver/Cargo.toml -i
echo "going into sources directory and do cargo build --release"
cd fejs
cargo build --release --features=solc-backend
cd ..
mv fejs/target/release/libfejs.so fejs/pack/index.node
echo "in:"
pwd
echo "fejs/pack"
ls fejs/pack
echo "unit tests"
cd fejs/pack
npm test
echo "fertig"
cd ../../

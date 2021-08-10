//! The `fe` command-line interface.

//use std::fs;
use std::io::Error; //, Write};
                    //use std::path::Path;

//use clap::{arg_enum, values_t, App, Arg};

//use fe_common::diagnostics::print_diagnostics;
use fe_common::files::FileStore;
use fe_common::files::SourceFileId;
use fe_common::panic::install_panic_hook;
//use fe_driver::CompiledModule;

//use fe_driver::CompileError;
// use fe_parser::ast::Module;
use fe_parser::parse_file;
use fe_analyzer::analyze;
use fe_lowering::lower;



#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;

use serde_json::json;
use serde::{Serialize, Deserialize};



const DEFAULT_OUTPUT_DIR_NAME: &str = "output";
const VERSION: &str = env!("CARGO_PKG_VERSION");


// #[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
// pub struct Token<'a> {
//     pub kind: TokenKind,
//     pub text: &'a str,
//     pub span: Span,
// }
/*
arg_enum! {
    #[derive(PartialEq, Debug)]
    pub enum CompilationTarget {
        Abi,
        Ast,
        LoweredAst,
        Bytecode,
        Json,
        Tokens,
        Yul,
    }
}
*/
// pub fn main() {///ss=require('.').compileFromFilename("/home/mmm/github/latest_fe/fe/crates/test-files/fixtures/features/base_tuple.fe")
// don't do this!!!
//fn module_to_static(s: Module) -> Module {
//   &Box::leak(Box::new(s))
//}

export! {


    fn compileToAST(textBuffer: String) -> serde_json::Value {
        let ( fe_module,  parser_diagnostics) =
                    parse_file(&textBuffer, SourceFileId(1)).expect("oh no! function() failed!!");//file id=1??
     let ret = &fe_module;
    json!(&fe_module)
    }
    fn compileToLoweredAST(textBuffer: String) -> serde_json::Value {
        let ( fe_module,  parser_diagnostics) =
                    parse_file(&textBuffer, SourceFileId(1)).expect("oh no! function() failed!!");
        // analyze source code
    let analysis =  analyze(&fe_module, SourceFileId(1)).expect("oh no! function() failed!!");
    //  {
    //     Ok(_) if !errors.is_empty() => return Err(CompileError(errors)),
    //     Ok(analysis) => analysis,
    //     Err(err) => {
    //         errors.extend(err.0.into_iter());
    //         return Err(CompileError(errors));
    //     }
    // };
    // lower the AST
    let lowered_fe_module = lower(&analysis, fe_module.clone());
    json!(&lowered_fe_module)
    }

    // fn analyze(textBuffer: String) -> serde_json::Value {
    //     let ( fe_module,  parser_diagnostics) =
    //                 parse_file(&textBuffer, SourceFileId(1)).expect("oh no! function() failed!!");
    //     // analyze source code
    // let analysis =  analyze(&fe_module, SourceFileId(1)).expect("oh no! function() failed!!");
    
    // json!(&analysis)
    // }

    fn getTokens(textBuffer: String) -> serde_json::Value {
        let tokens = {
            let lexer = fe_parser::lexer::Lexer::new(&textBuffer);
            lexer.collect::<Vec<_>>()
        };
    json!(&tokens)
    }



fn compileToASTString(textBuffer: String) -> &'static str {
    let ( fe_module,  parser_diagnostics) =
                    parse_file(&textBuffer, SourceFileId(1)).expect("oh no! function() failed!!");//file id=1??
    //fix this dirty solution, try to grasp the borrowing thing
    let s: &'static str = string_to_static_str(serde_json::to_string(&fe_module).unwrap());
    return s
    }
 fn compileToASTStringFromFilename(fileName: String) -> &'static str {
    install_panic_hook();
/* implement these in js
    let matches = App::new("Fe")
        .version(VERSION)
        .about("Compiler for the Fe language")
        .arg(
            Arg::with_name("input")
                .help("The input source file to use e.g erc20.fe")
                .index(1)
                .required(true),
        )
        .arg(
            Arg::with_name("output-dir")
                .short("o")
                .long("output-dir")
                .help("The directory to store the compiler output e.g /tmp/output")
                .takes_value(true)
                .default_value(DEFAULT_OUTPUT_DIR_NAME),
        )
        .arg(
            Arg::with_name("emit")
                .short("e")
                .long("emit")
                .help("Comma separated compile targets e.g. -e=bytecode,yul")
                .possible_values(&[
                    "abi",
                    "bytecode",
                    "json",
                    "ast",
                    "tokens",
                    "yul",
                    "loweredAst",
                ])
                .default_value("abi,bytecode")
                .use_delimiter(true)
                .takes_value(true),
        )
        .arg(
            Arg::with_name("overwrite")
                .long("overwrite")
                .help("Overwrite contents of output directory`"),
        )
        .arg(
            Arg::with_name("optimize")
                .long("optimize")
                .help("Enables the Yul optimizer`")
                .possible_values(&["true", "false"])
                .default_value("true")
                .use_delimiter(false)
                .takes_value(true),
        )
        .get_matches();
*/
    let input_file = &fileName;//matches.value_of("input").unwrap();
    //let output_dir = "output";//matches.value_of("output-dir").unwrap();
 /*   let overwrite = true;//matches.is_present("overwrite");
    let optimize = true;//matches.value_of("optimize") == Some("true");
    let targets =
        values_t!(matches.values_of("emit"), CompilationTarget).unwrap_or_else(|e| e.exit());
    let with_bytecode = targets.contains(&CompilationTarget::Bytecode);
    #[cfg(not(feature = "solc-backend"))]
    if with_bytecode {
        eprintln!("Warning: bytecode output requires 'solc-backend' feature. Try `cargo build --release --features solc-backend`. Skipping.");
    }
*/
    let mut files = FileStore::new();
    let file = files.load_file(input_file).map_err(ioerr_to_string);
    if let Err(err) = file {
        eprintln!("Failed to load file: `{}`. Error: {}", input_file, err);
        std::process::exit(1);
    }
    let (content, id) = file.unwrap();
    let (fe_module, parser_diagnostics) =
                    parse_file(&content, id).expect("oh no! function() failed!!");

    let ret = &fe_module;
    let ss = serde_json::to_string(ret);
    //fix this dirty solution, try to grasp the borrowing thing
    let s: &'static str = string_to_static_str(ss.unwrap());
    return s
}
    }

// don't do this!!!
fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

fn ioerr_to_string(error: Error) -> String {
    format!("{}", error)
}

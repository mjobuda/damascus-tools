use std::io::Error; 
use fe_parser::parse_file;
use fe_analyzer::analyze;
use fe_lowering::lower;
use fe_common::files::SourceFileId;
#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;
use serde_json::json;

const DEFAULT_OUTPUT_DIR_NAME: &str = "output";
const VERSION: &str = env!("CARGO_PKG_VERSION");

//#[macro_use]
//use wrap_macros::export;





export! {


    fn compile_to_ast(text_buffer: String) -> serde_json::Value {
        // let sf = SourceFile::new(&"halo",&text_buffer);
        let ( fe_module,  _parser_diagnostics) =
                    parse_file(&text_buffer, SourceFileId(1)).expect("oh no! function() failed!!");//file id=1??
     let _ret = &fe_module;
    json!(&fe_module)
    }


    fn compile_to_lowered_ast(text_buffer: String) -> serde_json::Value {
        let ( fe_module,  _parser_diagnostics) =
                    parse_file(&text_buffer, SourceFileId(1)).expect("oh no! function() failed!!");
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

    // fn analyze(text_buffer: String) -> serde_json::Value {
    //     let ( fe_module,  parser_diagnostics) =
    //                 parse_file(&text_buffer, SourceFileId(1)).expect("oh no! function() failed!!");
    //     // analyze source code
    // let analysis =  analyze(&fe_module, SourceFileId(1)).expect("oh no! function() failed!!");
    
    // json!(&analysis)
    // }

    fn get_token(text_buffer: String) -> serde_json::Value {
        let tokens = {
            let lexer = fe_parser::lexer::Lexer::new(&text_buffer);
            lexer.collect::<Vec<_>>()
        };
    json!(&tokens)
    }

fn compile_to_ast_str(text_buffer: String) -> &'static str {
    let ( fe_module,  _parser_diagnostics) =
                    parse_file(&text_buffer, SourceFileId(1)).expect("oh no! function() failed!!");//file id=1??
    //fix this dirty solution, try to grasp the borrowing thing
    let s: &'static str = string_to_static_str(serde_json::to_string(&fe_module).unwrap());
    return s
    }
fn compile(text_buffer: String) -> serde_json::Value {
    let compiled_module = fe_driver::compile(&text_buffer, SourceFileId(1), true, true).expect("oh no! function() failed!!");
    json!(compiled_module)
    }
 }

// don't do this!!!
fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

fn ioerr_to_string(error: Error) -> String {
    format!("{}", error)
}

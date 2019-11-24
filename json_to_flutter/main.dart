import 'package:clippy/server.dart' as clippy;
import 'debug.dart';
import 'functions/checkRelationAndInsert.dart';
import 'functions/jsonToWidgetList.dart';
import 'models/index.dart';

// dart main.dart run
// dartaotruntime xd_to_flutter.aot run
// dart2native main.dart -k aot

/*
! to fix
* to implement
? do better

! work with rotation
* generate with layout (spacer, sizedbox, margin, padding, alignment)
* division text
*/

Future main(List<String> args) async {
  // Appy Args
  applyArgs(args);
  // Generate widgets from Json
  List<dynamic> widgets = await jsonToWidgetList();
  if (widgets.length > 0) {
    // Generate Tree
    for (var i = 0; i < widgets.length; i++)
      checkRelationAndInsert(treeHead, widgets[i]);
    // Generate code
    String code = treeHead.widget.generateWidget(treeHead);
    // Logs
    logTree(treeHead, 0);
    logCode(code);
    // Copy to Clipboard
    copyToClipboard(code);
  } else {
    print(red("Without Widget"));
  }
}

Layout layout;
bool withSimpleCode;
bool withDivision;
bool verbose;
bool verboseCode;

applyArgs(List<String> args) {
  withSimpleCode = true;
  withDivision = false;
  verbose = true;
  verboseCode = false;
  layout = Layout.spacer;
}

copyToClipboard(String code) async {
  await clippy.write(code);
  print(green("Successfully generated (copied to clipboard)"));
}

import { TextEditor, window } from 'vscode';
import { commandsToQuickPickItems, removeCodiconFromLabel } from '../quickPick';
import { getAllVscodeCommands } from '../utils';

export async function suggestCommandsCommand(editor: TextEditor) {
	const quickPickItems = commandsToQuickPickItems(await getAllVscodeCommands());
	const picked = await window.showQuickPick(quickPickItems);
	if (!picked) {
		return;
	}
	const label = removeCodiconFromLabel(picked.label);
	editor.edit(builder => {
		builder.insert(editor.selection.active, label);
	});
}

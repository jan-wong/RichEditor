/**
 * 链接插件
 */
import Button from '../controls/button';
import LinkDialog from '../controls/linkDialog';
import Editor from '../core/editor';
import RichEditor from '../core/richEditor';

class Link {
  button: Button;
  linkDialog: LinkDialog;
  editor: Editor;

  install (context: RichEditor) {
    const { editor, svgs, toolbar, control } = context;
    this.editor = editor;

    const Button = control.require('button');
    this.button = new Button(toolbar.el);
    this.button.setIcon(svgs.link);
    this.button.on('click', (e: MouseEvent) => this.onClick(e));

    const LinkDialog = control.require('linkDialog');
    this.linkDialog = new LinkDialog(this.button.el, {
      title: '编辑链接'
    });
    this.linkDialog.on('confirm', (href, text, title) => this.insertHref(href, text, title));
    editor.on('rangechange', this.onRangeChange.bind(this));
  }

  onClick(e: MouseEvent) {
    if (this.linkDialog.visible) return this.linkDialog.close();
    this.linkDialog.open();
  }

  insertHref(href: string, text: string, title: string) {
    this.editor.execCommand('createLink', false, href, text, title);
  }

  onRangeChange() {
    const nodeChain = this.editor.getNodeChain();
    const node = nodeChain.find(node => node.tagName === 'A');
    if (!node) return this.linkDialog.setValue('', '', '');
    const href = node.getAttribute('href');
    const text = node.textContent;
    const title = node.getAttribute('title');
    this.linkDialog.setValue(href, text, title);
  }
}

export default Link;
/**
 * Minimal Prism-compatible syntax highlighter for CSS and HTML.
 * Supports Prism.highlightElement() and Prism.highlight() APIs.
 */
var Prism = (function () {
  'use strict';

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // CSS tokenizer
  function highlightCSS(code) {
    var out = '';
    var i = 0;
    var len = code.length;

    while (i < len) {
      // Comment
      if (code[i] === '/' && code[i+1] === '*') {
        var end = code.indexOf('*/', i + 2);
        end = end === -1 ? len : end + 2;
        out += '<span class="token comment">' + escapeHTML(code.slice(i, end)) + '</span>';
        i = end;
        continue;
      }

      // String (double or single quote)
      if (code[i] === '"' || code[i] === "'") {
        var q = code[i];
        var j = i + 1;
        while (j < len && code[j] !== q) {
          if (code[j] === '\\') j++;
          j++;
        }
        j = Math.min(j + 1, len);
        out += '<span class="token string">' + escapeHTML(code.slice(i, j)) + '</span>';
        i = j;
        continue;
      }

      // At-rule
      if (code[i] === '@') {
        var m = code.slice(i).match(/^@[a-z-]+/i);
        if (m) {
          out += '<span class="token atrule">' + escapeHTML(m[0]) + '</span>';
          i += m[0].length;
          continue;
        }
      }

      // CSS custom property (--var)
      if (code[i] === '-' && code[i+1] === '-') {
        var m2 = code.slice(i).match(/^--[a-zA-Z0-9_-]+/);
        if (m2) {
          out += '<span class="token variable">' + escapeHTML(m2[0]) + '</span>';
          i += m2[0].length;
          continue;
        }
      }

      // Property: scan backwards context — if inside {} and not value position
      // Selector heuristic: before { inside the block
      // Hex color
      if (code[i] === '#') {
        var hex = code.slice(i).match(/^#[0-9a-fA-F]{3,8}/);
        if (hex) {
          out += '<span class="token hexcode">' + escapeHTML(hex[0]) + '</span>';
          i += hex[0].length;
          continue;
        }
      }

      // Number + unit
      if (/[0-9]/.test(code[i]) || (code[i] === '-' && /[0-9]/.test(code[i+1]))) {
        var nm = code.slice(i).match(/^-?[0-9]+(\.[0-9]+)?(px|em|rem|%|vh|vw|deg|s|ms|fr)?/);
        if (nm && nm[0].length > 0) {
          out += '<span class="token number">' + escapeHTML(nm[0]) + '</span>';
          i += nm[0].length;
          continue;
        }
      }

      // Punctuation
      if (/[{}();,:]/.test(code[i])) {
        out += '<span class="token punctuation">' + escapeHTML(code[i]) + '</span>';
        i++;
        continue;
      }

      // Keywords / property names / values
      var word = code.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_-]*/);
      if (word) {
        var cssKeywords = /^(none|auto|inherit|initial|unset|normal|bold|italic|flex|grid|block|inline|relative|absolute|fixed|sticky|center|left|right|top|bottom|middle|transparent|solid|dashed|dotted|hidden|visible|scroll|overflow|wrap|nowrap|break|all|row|column|space|between|around|evenly|start|end|stretch)$/;
        var cssProps = /^(display|position|margin|padding|width|height|background|border|color|font|text|line|overflow|flex|grid|gap|align|justify|transform|transition|opacity|cursor|z-index|box-shadow|border-radius|outline|visibility|content|pointer-events|user-select|filter|backdrop-filter|min-width|max-width|min-height|max-height|letter-spacing|word-spacing|white-space|resize|list-style|top|left|right|bottom|inset|float|clear|clip|animation|object-fit|appearance|vertical-align)$/;
        if (cssKeywords.test(word[0])) {
          out += '<span class="token keyword">' + escapeHTML(word[0]) + '</span>';
        } else if (cssProps.test(word[0])) {
          out += '<span class="token property">' + escapeHTML(word[0]) + '</span>';
        } else {
          out += escapeHTML(word[0]);
        }
        i += word[0].length;
        continue;
      }

      out += escapeHTML(code[i]);
      i++;
    }

    return out;
  }

  // HTML tokenizer
  function highlightHTML(code) {
    var out = '';
    var i = 0;
    var len = code.length;

    while (i < len) {
      // Comment
      if (code.slice(i, i+4) === '<!--') {
        var end = code.indexOf('-->', i + 4);
        end = end === -1 ? len : end + 3;
        out += '<span class="token comment">' + escapeHTML(code.slice(i, end)) + '</span>';
        i = end;
        continue;
      }

      // DOCTYPE
      if (code.slice(i, i+9).toUpperCase() === '<!DOCTYPE') {
        var end2 = code.indexOf('>', i);
        end2 = end2 === -1 ? len : end2 + 1;
        out += '<span class="token doctype">' + escapeHTML(code.slice(i, end2)) + '</span>';
        i = end2;
        continue;
      }

      // Tag
      if (code[i] === '<') {
        var closing = code[i+1] === '/';
        var tagMatch = code.slice(i).match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/s);
        if (tagMatch) {
          var fullTag = tagMatch[0];
          var tagName = tagMatch[1];
          var attrStr = tagMatch[2];

          // Highlight tag with attributes
          var tagOpen = '<span class="token tag">' +
            '<span class="token punctuation">' + escapeHTML(code[i] + (closing ? '/' : '')) + '</span>' +
            '<span class="token tag-name">' + escapeHTML(tagName) + '</span>';

          // Highlight attributes
          var highlighted = attrStr.replace(/([a-zA-Z_][a-zA-Z0-9_:-]*)(\s*=\s*)("([^"]*)"|'([^']*)'|(\S+))/g,
            function (m, name, eq, val) {
              return '<span class="token attr-name">' + escapeHTML(name) + '</span>' +
                '<span class="token punctuation">' + escapeHTML(eq) + '</span>' +
                '<span class="token attr-value">' + escapeHTML(val) + '</span>';
            });

          tagOpen += highlighted +
            '<span class="token punctuation">' + escapeHTML(fullTag.slice(-1)) + '</span>' +
            '</span>';

          out += tagOpen;
          i += fullTag.length;
          continue;
        }
      }

      // String-like content inside style/script — pass through for now
      out += escapeHTML(code[i]);
      i++;
    }

    return out;
  }

  var Prism = {
    highlight: function (code, grammar, language) {
      if (language === 'css') return highlightCSS(code);
      if (language === 'html' || language === 'markup') return highlightHTML(code);
      return escapeHTML(code);
    },

    highlightElement: function (el) {
      var lang = (el.className.match(/language-(\w+)/) || [])[1] || 'markup';
      var code = el.textContent || '';
      el.innerHTML = Prism.highlight(code, null, lang);
      el.classList.add('language-' + lang);
    }
  };

  return Prism;
})();

osh
===

OmniStack Helper (osh) - Create your JS and TS components and more

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/osh.svg)](https://npmjs.org/package/osh)
[![Downloads/week](https://img.shields.io/npm/dw/osh.svg)](https://npmjs.org/package/osh)
[![License](https://img.shields.io/npm/l/osh.svg)](https://github.com/EliasGcf/osh/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g osh-cli
$ osh COMMAND
running command...
$ osh (-v|--version|version)
osh-cli/0.0.8 darwin-x64 node-v12.16.2
$ osh --help [COMMAND]
USAGE
  $ osh COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`osh create:component COMPONENT-NAME`](#osh-createcomponent-component-name)
* [`osh create:page PAGE-NAME`](#osh-createpage-page-name)
* [`osh help [COMMAND]`](#osh-help-command)

## `osh create:component COMPONENT-NAME`

Create new component inside src/components

```
USAGE
  $ osh create:component COMPONENT-NAME

ARGUMENTS
  COMPONENT-NAME  Nome of the component

OPTIONS
  -h, --help         show CLI help
  -i, --index=index  create index file to export for default your components
  --ts               make with TypeScript

ALIASES
  $ osh cc

EXAMPLES
  $ osh create:component Button
  $ osh create:component Input --ts
  $ osh create:component MyInput -i=Form
```

_See code: [src/commands/create/component.ts](https://github.com/EliasGcf/osh-cli/blob/v0.0.8/src/commands/create/component.ts)_

## `osh create:page PAGE-NAME`

Create new page inside src/pages

```
USAGE
  $ osh create:page PAGE-NAME

ARGUMENTS
  PAGE-NAME  Nome of the page

OPTIONS
  -h, --help  show CLI help
  --ts        make with TypeScript

ALIASES
  $ osh cp

EXAMPLES
  $ osh create:page SignIn
  $ osh create:page Dashboard --ts
```

_See code: [src/commands/create/page.ts](https://github.com/EliasGcf/osh-cli/blob/v0.0.8/src/commands/create/page.ts)_

## `osh help [COMMAND]`

display help for osh

```
USAGE
  $ osh help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->

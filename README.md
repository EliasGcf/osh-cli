osh
===

Create your JS and TS components and more

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
$ npm install -g osh
$ osh COMMAND
running command...
$ osh (-v|--version|version)
osh/0.0.3 darwin-x64 node-v12.16.1
$ osh --help [COMMAND]
USAGE
  $ osh COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`osh create:component FILE-NAME`](#osh-createcomponent-file-name)
* [`osh create:page [FILE]`](#osh-createpage-file)
* [`osh help [COMMAND]`](#osh-help-command)

## `osh create:component FILE-NAME`

Create new component inside src/components

```
USAGE
  $ osh create:component FILE-NAME

ARGUMENTS
  FILE-NAME  Nome of the component

OPTIONS
  -h, --help  show CLI help
  --ts        make with TypeScript

ALIASES
  $ osh cp
```

_See code: [src/commands/create/component.ts](https://github.com/EliasGcf/osh/blob/v0.0.3/src/commands/create/component.ts)_

## `osh create:page [FILE]`

Create new page inside src/pages

```
USAGE
  $ osh create:page [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/create/page.ts](https://github.com/EliasGcf/osh/blob/v0.0.3/src/commands/create/page.ts)_

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

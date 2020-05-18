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
osh-cli/0.0.14 darwin-x64 node-v12.16.3
$ osh --help [COMMAND]
USAGE
  $ osh COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`osh autocomplete [SHELL]`](#osh-autocomplete-shell)
* [`osh create:component COMPONENT-NAME`](#osh-createcomponent-component-name)
* [`osh create:page PAGE-NAME`](#osh-createpage-page-name)
* [`osh create:route ROUTE-NAME`](#osh-createroute-route-name)
* [`osh help [COMMAND]`](#osh-help-command)

## `osh autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ osh autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ osh autocomplete
  $ osh autocomplete bash
  $ osh autocomplete zsh
  $ osh autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.5/src/commands/autocomplete/index.ts)_

## `osh create:component COMPONENT-NAME`

Create new component inside src/components

```
USAGE
  $ osh create:component COMPONENT-NAME

ARGUMENTS
  COMPONENT-NAME  Name of the component

OPTIONS
  -h, --help                 show CLI help
  -i, --index=index          create index file to export for default your components
  -p, --path=src/components  [default: src/components] change the path to your component
  --ts                       make with TypeScript

ALIASES
  $ osh cc

EXAMPLES
  $ osh create:component Button
  $ osh create:component Input --ts
  $ osh create:component --path=src/otherFolder Input
  $ osh create:component MyInput -i=Form
```

_See code: [src/commands/create/component.ts](https://github.com/EliasGcf/osh-cli/blob/v0.0.14/src/commands/create/component.ts)_

## `osh create:page PAGE-NAME`

Create new page inside src/pages

```
USAGE
  $ osh create:page PAGE-NAME

ARGUMENTS
  PAGE-NAME  Name of the page

OPTIONS
  -h, --help            show CLI help
  -p, --path=src/pages  [default: src/pages] change the path to your page
  --ts                  make with TypeScript

ALIASES
  $ osh cp

EXAMPLES
  $ osh create:page SignIn
  $ osh create:page -p=src/screens SignUp
  $ osh create:page Dashboard --ts
```

_See code: [src/commands/create/page.ts](https://github.com/EliasGcf/osh-cli/blob/v0.0.14/src/commands/create/page.ts)_

## `osh create:route ROUTE-NAME`

Create new express route.(ts|js) inside src/routes

```
USAGE
  $ osh create:route ROUTE-NAME

ARGUMENTS
  ROUTE-NAME  Name of route file

OPTIONS
  -h, --help             show CLI help
  -p, --path=src/routes  [default: src/routes] change the path to your route
  --ts                   make with TypeScript

ALIASES
  $ osh cr

EXAMPLE
  $ osh create:route users
```

_See code: [src/commands/create/route.ts](https://github.com/EliasGcf/osh-cli/blob/v0.0.14/src/commands/create/route.ts)_

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

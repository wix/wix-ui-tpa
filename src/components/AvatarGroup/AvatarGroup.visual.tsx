import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AvatarGroup } from './';
import { AvatarGroupSize } from './AvatarGroup';
import { VisualTestContainer } from '../../../test/visual/VisualTestContainer';

const items = [
  {},
  { name: 'anonymous' },
  {
    name: 'Eve',
    src:
      'data:image/jpeg;base64,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Oi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmF1eD0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC9hdXgvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHBob3Rvc2hvcDpTb3VyY2U9Ildlc3RlbmQ2MSIgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iQ29udHJpYnV0b3IiIHBob3Rvc2hvcDpDb3B5cmlnaHRGbGFnPSJ0cnVlIiBwaG90b3Nob3A6RGF0ZUNyZWF0ZWQ9IjIwMTctMDUtMTIiIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcy9XZXN0ZW5kNjEiIHBob3Rvc2hvcDpIZWFkbGluZT0iUG9ydHJhaXQgb2Ygc21pbGluZyBtYXR1cmUgbWFuIiBwaG90b3Nob3A6VVJMPSJodHRwOi8vd3d3LmdldHR5aW1hZ2VzLmNvbSIgcGhvdG9zaG9wOkluc3RydWN0aW9ucz0iTW9kZWwgUmVsZWFzZWQgKE1SKSAiIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSI5ODU5RUMwNEE5NTkzQkVFQTk3OTJCNUIxNUUyOThEMSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkFkb2JlIFJHQiAoMTk5OCkiIEdldHR5SW1hZ2VzR0lGVDpEbHJlZj0iT0hUMENzQ1Rndlg3K3pTeUE2THVKQT09IiBHZXR0eUltYWdlc0dJRlQ6SW1hZ2VSYW5rPSIyIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iNzM1ODk1ODA3IiBwbHVzOkxpY3NlbnNvclVSTD0iaHR0cDovL3d3dy5nZXR0eWltYWdlcy5jb20iIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0xNlQxMTo0OToyOSswMzowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMTctMDQtMjlUMTM6MjE6NDkiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDQtMTZUMTE6NDk6MjkrMDM6MDAiIGF1eDpBcHByb3hpbWF0ZUZvY3VzRGlzdGFuY2U9IjAvMSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjczNzI2ODBiLWIyN2MtMjA0Ny1iZDY1LWMxZDI5MDU1N2MwMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMzc3NjdhMy05YmFkLTQ0ZDAtODEyNS1jZTMyZTk3ZDdjM2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iNDM3N0E1QUI4N0JEMDkxMjJBNDc2OEQ2QTlEOEQ5QzQiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOmVhMjRmMjlmLTc3YzItNGIwZi1iNWJlLTE4NzllNDA5NjM3MjwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPjczNTg5NTgwNzwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDxkYzpzdWJqZWN0PiA8cmRmOkJhZz4gPHJkZjpsaT5wb3J0cmFpdDwvcmRmOmxpPiA8cmRmOmxpPm1hbjwvcmRmOmxpPiA8cmRmOmxpPnBlb3BsZTwvcmRmOmxpPiA8cmRmOmxpPkFkdWx0czwvcmRmOmxpPiA8cmRmOmxpPnNtaWxpbmc8L3JkZjpsaT4gPHJkZjpsaT5CZXN0IEFnZXI8L3JkZjpsaT4gPHJkZjpsaT50LXNoaXJ0PC9yZGY6bGk+IDxyZGY6bGk+RmFjaWFsIEV4cHJlc3Npb248L3JkZjpsaT4gPHJkZjpsaT5sb29raW5nPC9yZGY6bGk+IDxyZGY6bGk+bG9va2luZyBhdCBjYW1lcmE8L3JkZjpsaT4gPHJkZjpsaT5IZWFkIGFuZCBzaG91bGRlcnM8L3JkZjpsaT4gPHJkZjpsaT5zdHVkaW8gc2hvdDwvcmRmOmxpPiA8cmRmOmxpPmxpZ2h0IGJsdWU8L3JkZjpsaT4gPHJkZjpsaT5jYXN1YWw8L3JkZjpsaT4gPHJkZjpsaT5jb3B5IHNwYWNlPC9yZGY6bGk+IDxyZGY6bGk+c2NlcHRpY2FsPC9yZGY6bGk+IDxyZGY6bGk+Z3JheSBiYWNrZ3JvdW5kPC9yZGY6bGk+IDxyZGY6bGk+YXNraW5nPC9yZGY6bGk+IDxyZGY6bGk+bWF0dXJlIG1lbjwvcmRmOmxpPiA8cmRmOmxpPm9uZSBwZXJzb248L3JkZjpsaT4gPHJkZjpsaT41MC01NCB5ZWFyczwvcmRmOmxpPiA8cmRmOmxpPjUwIFBsdXMgWWVhcnM8L3JkZjpsaT4gPHJkZjpsaT5jYXVjYXNpYW48L3JkZjpsaT4gPHJkZjpsaT5zdHViYmxlPC9yZGY6bGk+IDxyZGY6bGk+bGlnaHQgYnJvd24gaGFpcjwvcmRmOmxpPiA8cmRmOmxpPmluZG9vcnM8L3JkZjpsaT4gPHJkZjpsaT5jb2xvdXI8L3JkZjpsaT4gPHJkZjpsaT5ibHVlPC9yZGY6bGk+IDxyZGY6bGk+cGxhaW4gYmFja2dyb3VuZDwvcmRmOmxpPiA8cmRmOmxpPm1hdHVyZSBhZHVsdHM8L3JkZjpsaT4gPHJkZjpsaT41MC02MCB5ZWFyczwvcmRmOmxpPiA8cmRmOmxpPmJlYXJkPC9yZGY6bGk+IDxyZGY6bGk+UGhvdG9ncmFwaHk8L3JkZjpsaT4gPHJkZjpsaT5Db2xvciBJbWFnZTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvZGM6c3ViamVjdD4gPGRjOmNyZWF0b3I+IDxyZGY6U2VxPiA8cmRmOmxpPldlc3RlbmQ2MTwvcmRmOmxpPiA8L3JkZjpTZXE+IDwvZGM6Y3JlYXRvcj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2M2ZTI5OTEtOTJmZC00ZjA1LTg5MDUtYmZhZWViYWRlNzBhIiBzdEV2dDp3aGVuPSIyMDE5LTA0LTE2VDExOjQ5OjA4KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjE3OWNkMC0xMjQ4LTQ4ZTYtYjU4Yy04YTVjYjM4MmNkMzciIHN0RXZ0OndoZW49IjIwMTktMDQtMTZUMTE6NDk6MDgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZmYzZjk1OC1mNzBhLTRjZDItYTIxMy0wNTRlZjQyM2RhODEiIHN0RXZ0OndoZW49IjIwMTktMDQtMTZUMTE6NDk6MjkrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzNzc2N2EzLTliYWQtNDRkMC04MTI1LWNlMzJlOTdkN2MzYiIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0xNlQxMTo0OToyOSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNmZjNmOTU4LWY3MGEtNGNkMi1hMjEzLTA1NGVmNDIzZGE4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjE3OWNkMC0xMjQ4LTQ4ZTYtYjU4Yy04YTVjYjM4MmNkMzciIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0iNDM3N0E1QUI4N0JEMDkxMjJBNDc2OEQ2QTlEOEQ5QzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/tGfpQaG90b3Nob3AgMy4wADhCSU0EBAAAAAACqxwCAAACAAAcAmkAHlBvcnRyYWl0IG9mIHNtaWxpbmcgbWF0dXJlIG1hbhwCKAAUTW9kZWwgUmVsZWFzZWQgKE1SKSAcAlAACVdlc3RlbmQ2MRwCVQALQ29udHJpYnV0b3IcAm4AFkdldHR5IEltYWdlcy9XZXN0ZW5kNjEcAnMACVdlc3RlbmQ2MRwCBQAJNzM1ODk1ODA3HAI3AAgyMDE3MDUxMhwCPAALMDAwMDAwKzAwMDAcAhkACHBvcnRyYWl0HAIZAANtYW4cAhkABnBlb3BsZRwCGQAGQWR1bHRzHAIZAAdzbWlsaW5nHAIZAAlCZXN0IEFnZXIcAhkAB3Qtc2hpcnQcAhkAEUZhY2lhbCBFeHByZXNzaW9uHAIZAAdsb29raW5nHAIZABFsb29raW5nIGF0IGNhbWVyYRwCGQASSGVhZCBhbmQgc2hvdWxkZXJzHAIZAAtzdHVkaW8gc2hvdBwCGQAKbGlnaHQgYmx1ZRwCGQAGY2FzdWFsHAIZAApjb3B5IHNwYWNlHAIZAAlzY2VwdGljYWwcAhkAD2dyYXkgYmFja2dyb3VuZBwCGQAGYXNraW5nHAIZAAptYXR1cmUgbWVuHAIZAApvbmUgcGVyc29uHAIZAAs1MC01NCB5ZWFycxwCGQANNTAgUGx1cyBZZWFycxwCGQAJY2F1Y2FzaWFuHAIZAAdzdHViYmxlHAIZABBsaWdodCBicm93biBoYWlyHAIZAAdpbmRvb3JzHAIZAAZjb2xvdXIcAhkABGJsdWUcAhkAEHBsYWluIGJhY2tncm91bmQcAhkADW1hdHVyZSBhZHVsdHMcAhkACzUwLTYwIHllYXJzHAIZAAViZWFyZBwCGQALUGhvdG9ncmFwaHkcAhkAC0NvbG9yIEltYWdlADhCSU0EJQAAAAAAEMjWQi58Ajn+9YYGeJL2gZ44QklNBDoAAAAAAQkAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAABMASABhAG4AZwBhAHIAMQBfAEUAYQBzAHQAXwBDAG8AbABvAHIAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAcsAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEAEsAAAAAQACASwAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAA4QklNBAIAAAAAAAIAADhCSU0EMAAAAAAAAQEAOEJJTQQtAAAAAAAGAAEAAAADOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA18AAAAGAAAAAAAAAAAAAAj7AAAGhgAAABUARwBlAHQAdAB5AEkAbQBhAGcAZQBzAC0ANwAzADUAOAA5ADUAOAAwADcAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAABoYAAAj7AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABM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\n',
    // 'https://static.wixstatic.com/media/11062b_c09ec4aab8204a38addeb492a8cb8c3e~mv2_d_1670_2299_s_2.jpg/v1/fill/w_120,h_120/11062b_c09ec4aab8204a38addeb492a8cb8c3e~mv2_d_1670_2299_s_2.jpg',
  },
];

const WAIT_TIMEOUT = 600;

class AvatarGroupVisual extends React.Component<any> {
  static defaultProps = {
    items: [],
  };

  _waitForImages(): Promise<void> {
    return new Promise(res => {
      setTimeout(res, WAIT_TIMEOUT);
    });
  }

  render() {
    return (
      <VisualTestContainer hook={this._waitForImages}>
        <AvatarGroup {...this.props} />
      </VisualTestContainer>
    );
  }
}

const tests = Object.keys(AvatarGroupSize).map(avatarSize => ({
  describe: `size: ${avatarSize}`,
  its: generateIts(avatarSize),
}));

const Link = () => (
  <AvatarGroup.TextButton key="textbutton">Click me</AvatarGroup.TextButton>
);

function generateIts(size) {
  return [
    {
      it: 'Empty',
      props: { size },
    },
    {
      it: 'With 3 items and default limit',
      props: { size, items: [...items] },
    },
    {
      it: 'With 6 items and default limit',
      props: {
        size,
        items: [...items, ...items],
      },
    },
    {
      it: 'With 12 items and custom limit',
      props: {
        items: [...items, ...items, ...items, ...items],
        maxAmount: 9,
        size,
      },
    },
    {
      it: 'With optional text link',
      props: {
        size,
        items: [...items],
        children: [Link()],
      },
    },
  ];
}

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`AvatarGroup/${describe}`, module).add(it, () => (
      <AvatarGroupVisual {...props} />
    ));
  });
});

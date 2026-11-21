/** #ASTogether RSVP endpoint connected to the existing Wedding Planner spreadsheet. */
const SPREADSHEET_ID = '1QY5_q74_WDp1QAcuQD39WmezLSJGwpHz-1-yGKM4YUo';
const SHEET_NAME = 'RSVP';
const HEADERS = ['Timestamp', 'Full Name', 'Attendance', 'Guest Count', 'Message'];
function sheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS); sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}
function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === 'list') {
    const values = sheet_().getDataRange().getValues();
    const wishes = values.slice(1)
      .filter(r => String(r[2]) === 'Attending' && String(r[4] || '').trim())
      .map(r => ({ fullName: String(r[1]), message: String(r[4]) }));
    const payload = { ok: true, wishes: wishes.slice(-100) };
    const callback = String(e.parameter.callback || '').replace(/[^a-zA-Z0-9_$.]/g, '');
    if (callback) return ContentService.createTextOutput(callback + '(' + JSON.stringify(payload) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
    return json_(payload);
  }
  return json_({ ok: true, service: 'ASTogether RSVP', message: 'Endpoint is active.' });
}
function doPost(e) {
  try {
    const p = e && e.parameter ? e.parameter : {};
    if (p.action !== 'submit') return json_({ ok: false, error: 'Unknown action.' });
    const fullName = String(p.fullName || '').trim().slice(0, 100);
    const attendance = String(p.attendance || '');
    const guestCount = Math.max(0, Math.min(4, Number(p.guestCount || 0)));
    const message = String(p.message || '').trim().slice(0, 700);
    if (!fullName || !['Attending', 'Not Attending'].includes(attendance)) return json_({ ok: false, error: 'Invalid RSVP.' });
    const count = attendance === 'Attending' ? Math.max(1, guestCount) : 0;
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try { sheet_().appendRow([new Date(), fullName, attendance, count, message]); }
    finally { lock.releaseLock(); }
    return json_({ ok: true });
  } catch (err) { return json_({ ok: false, error: String(err.message || err) }); }
}
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

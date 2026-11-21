# Andy & Stephanie | #ASTogether Wedding Invitation

Static, mobile-first invitation. RSVP submissions are sent to the existing Wedding Planner spreadsheet through Google Apps Script.

## Publish with GitHub Pages
1. Open this repository: https://github.com/stephanietep/ASTogether
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then Save.
5. Expected URL: https://stephanietep.github.io/ASTogether/

A GitHub Actions workflow is also included at `.github/workflows/pages.yml`. If using the workflow, select **GitHub Actions** as the Pages build source in Settings → Pages.

## Google Sheets / Apps Script
The existing spreadsheet ID is configured in `google-apps-script/Code.gs`: `1QY5_q74_WDp1QAcuQD39WmezLSJGwpHz-1-yGKM4YUo`. The expected tab is `RSVP`, with columns: Timestamp, Full Name, Attendance, Guest Count, Message.

The deployed Apps Script URL is already set in `config.js`. The GET JSONP check previously returned `{"ok":true,"wishes":[]}`. The Apps Script code included here reflects the same spreadsheet ID. If replacing code in Apps Script, save and deploy a new version while keeping the same deployment URL.

## Edit wedding information
Edit `config.js`: exact ceremony/reception times, confirmed reception address, parents' names, bank information and gift delivery address remain placeholders until confirmed. Date-time values should use ISO format with Surabaya's `+07:00` offset, e.g. `2027-01-30T09:00:00+07:00`.

Add owned/authorized optimized media in `assets/`: `hero.jpg`, `groom.jpg`, `bride.jpg`, `closing.jpg`, and optionally `wedding-music.mp3`. No prewedding photos or music were included in the uploaded materials available for this build.

## Verify RSVP
Submit a test RSVP on the deployed site and check that a new row appears in the `RSVP` tab. The static frontend uses a no-cors POST, so the browser cannot inspect the response body; verify the row in Sheets. Remove test data before sharing the invitation. Public wishes display guest names and messages from attending guests, so only display messages intended for public viewing.

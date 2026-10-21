# WordPress handover

This is the portable kit for rebuilding the Community Portal as a WordPress/Astra
child theme — plain CSS and JS with no framework, no build step, and no
dependencies, meant to be copied into PHP templates by hand.

See the "WordPress handover" section of `CLAUDE.md` for the rules this kit exists
to enforce and the incidents each rule traces back to. This file is the *how*;
that one is the *why*.

## What's here

All of it lives in `public/handover/`, checked into this repo — not an emailed
zip. That's deliberate: a single source of truth that can't go stale between a
"here's the fix" email and someone remembering to re-send it.

- **`vantiq-portal.css`** — the stylesheet. Tokens (color/radius/shadow/font) as
  CSS custom properties, component classes read from those tokens, a scoped
  reset that neutralizes the host theme without `!important`.
- **`vantiq-interface.js`** — sitewide interactivity: accordions, the mobile nav
  drawer, pop-out menus, modal dialogs, tabs, the light/dark theme toggle. Driven entirely by `data-vq-*`
  attributes. No content, no data, no fetching — interface only.
- **`shell.html`** — the header + sidebar, hand-written and kept in sync with
  the real nav structure in `components/shell/app-sidebar.tsx`. View-source it
  and copy what you need.
- **`handover.html`** — every component class rendered next to the markup that
  produced it. Styled only by `vantiq-portal.css`, so if something in the CSS
  is wrong, this page shows it.
- **`vantiq-events.js`** — the `/events` month calendar. Events page only.
- **`vantiq-support.js`** + **`support-form.html`** — the Contact Support
  form: fields switch by reason and deployment, plus file uploads.
  `support-form.html` holds the whole `<form>`, ready to copy. Contact
  Support page only. See "Contact Support form" below.
- **`vantiq-login.css`** + **`login.html`** — restyles WordPress's own
  password-reset screens (`wp-login.php`). Login screen only. `login.html`
  reproduces WordPress's markup for each screen so the CSS can be checked
  here. See "Password reset" below.
- **`CHANGELOG.md`** — what changed in each version, newest first. All the
  files above carry the same version stamp, so checking whether you have the
  current kit is one comparison, not four.

Page-specific interactivity (search, sort, filter — anything with local state
beyond the sitewide patterns) gets its own `vantiq-<page>.js`, added as a page
actually needs it. As of 1.4.0 there are two: `vantiq-events.js` and
`vantiq-support.js`.

## Direct links (repo is public — pull from these, don't wait for a zip)

`agvantiq/community-portal` is public, so these are safe to bookmark and
re-fetch any time instead of waiting on an email:

- CSS: https://raw.githubusercontent.com/agvantiq/community-portal/master/public/handover/vantiq-portal.css
- JS: https://raw.githubusercontent.com/agvantiq/community-portal/master/public/handover/vantiq-interface.js
- Shell reference (view-source): https://github.com/agvantiq/community-portal/blob/master/public/handover/shell.html
- Component reference (view-source): https://github.com/agvantiq/community-portal/blob/master/public/handover/handover.html
- Login screens CSS: https://raw.githubusercontent.com/agvantiq/community-portal/master/public/handover/vantiq-login.css
- Contact Support JS: https://raw.githubusercontent.com/agvantiq/community-portal/master/public/handover/vantiq-support.js
- Contact Support form (view-source): https://github.com/agvantiq/community-portal/blob/master/public/handover/support-form.html
- Changelog: https://github.com/agvantiq/community-portal/blob/master/public/handover/CHANGELOG.md
- Whole folder: https://github.com/agvantiq/community-portal/tree/master/public/handover

These `master` links always show the current version — that's a feature, not a
risk, but it means "pull it" and "point the theme's `wp_enqueue_*` calls at
this URL" are different things. Download and copy the file into the theme;
don't have WordPress load CSS/JS live from `raw.githubusercontent.com` at
runtime — GitHub gives no uptime or caching guarantee for that, so it's fine
as a pull source and wrong as a production dependency.

## Using it

1. Copy `vantiq-portal.css` and `vantiq-interface.js` into the theme and
   enqueue them:

   ```php
   wp_enqueue_style( 'vantiq-portal',
       get_stylesheet_directory_uri() . '/css/vantiq-portal.css', [], '1.4.0' );
   wp_enqueue_script( 'vantiq-interface',
       get_stylesheet_directory_uri() . '/js/vantiq-interface.js', [], '1.4.0', true );
   ```

   The version string (`'1.4.0'`) should match the version comment at the top
   of each file — bump both together so a stale browser cache is never the
   difference between "fixed" and "still broken." `CHANGELOG.md` in this folder
   says what moved in each version.

2. Put `class="vq-root"` on one wrapper that contains everything copied from
   the mockup — commonly `<body>`, or the theme's main content block. Every
   rule in the stylesheet is scoped inside that wrapper; nothing leaks out to
   Astra's own header, footer, or admin bar, and nothing from Astra leaks in.

3. Copy markup from the **running app** (`npm run dev`,
   `http://localhost:3000/community-portal`), not the static `npm run build`
   export. The static export has no role state, so it renders the signed-out
   default — which has no sidebar. Switch roles in the header role-switcher to
   see the different nav/dashboard states before copying.

4. The one exception: `shell.html` stays hand-written, not copy-pasted. The
   real header's menus (search, notifications, account) render into React
   portals that only exist in the DOM while open — copying the rendered page
   captures the trigger buttons with no panels behind them. `shell.html`
   already has the full pattern (button + panel) for each one.

## Keeping it in sync

- **New interactive pattern added to a page** (a filter, a new kind of
  dropdown): its vanilla-JS equivalent belongs in this kit in the same change
  that adds it to the mockup, not as a follow-up once WordPress hits the gap.
- **Design tokens change** (`app/globals.css`): re-derive the `--vq-*` custom
  properties at the top of `vantiq-portal.css` from the new values. Don't
  hand-adjust a component rule to compensate — fix it at the token.
- **Contact Support fields change** (`lib/support-form.json`, or the form
  markup in `scripts/gen-support-form.mjs`): run
  `node scripts/gen-support-form.mjs` in the same change, so
  `support-form.html` matches the mockup.
- **A settings cheat sheet for the host theme's own customizer** (Astra, or
  whatever comes next): generate it from the actual token values in
  `vantiq-portal.css`, never type it from memory.
- Bump the version comment at the top of whichever file changed, every time it
  changes, even for a small fix.
- The WordPress build pulls straight from `master` now (see Direct links
  above), so a half-finished edit pushed to `master` is visible there
  immediately, not after a review step. Finish and visually verify a
  handover-kit change before pushing it, the same as any other change to this
  repo.

## Phase 2 pages (added in 1.2.0)

### Role rules

One sentence per difference; anything not listed is identical for every role.

- **Nav:** Sales Hub and Demos are output only for `partner`, `newpartner`,
  `employee`, `admin`, and `partneradmin`. Everyone else (`customer`,
  `guest`, `visitor`) gets every other group, including Developer Hub (with
  the Developer Forum, read-only for guests) and Community Hub (with
  Events).
- **Community Hub (`/community-hub`):** a `visitor` sees only a "sign in"
  prompt. A `guest` sees a "Register for partner access" prompt, a
  leaderboard link, and the Spaces list. Every other role sees their profile
  card (level ring, points, badges, tabs) above the Spaces list.
- **Leaderboard:** a `guest` or `visitor` can view it but never appears on
  it, and gets no "you" row highlight.
- **Events:** public. A `visitor` (logged out) can browse every event and
  read comments, but sees "Sign in to register" instead of Register and a
  sign-in prompt instead of the comment box, and has no "Registered Events"
  list. Every signed-in role gets the full page.

### Content and data decisions (not code — need an owner)

The mockup invents these; WordPress has to get them from somewhere real.
Each one needs a decision from the content/platform owner before it's built,
not a guess during the build:

- **Community points, levels, and badges.** The mockup has a points total,
  named levels, and a badge set per user. Is there a gamification plugin (or
  user meta) on the WordPress side that already tracks this, and does its
  model match? If not, the profile card and leaderboard have no data source.
- **"Show your company on the Leaderboard."** A per-user preference — needs
  a home in user meta.
- **Events.** Which plugin owns events, and does it have a category the
  calendar's two tones can key off (Summit vs. everything else)? Event
  registration, the "Registered" list, and the comment box on an event page
  are that plugin's / WordPress's own output (rule 10): restyle them with
  CSS, don't rebuild them.

- **Deal Registration confirmation.** On submit the form should redirect to
  a confirmation page (the live site already uses
  `/deal-registration-complete/`). It's all static copy — no entry values.
  The four review stages, "two business days", and partners@vantiq.com are
  copied from the live page; the partner desk owns them, so changes go
  through them, not the theme.
- **Deal Registration required fields.** The mockup's form deliberately
  skips validation (so reviewers can click straight through to the
  confirmation). The real form must enforce every field marked `*`:
  customer company, country, contact name, email, role, and business unit.

### States to design for (rule 11)

- Community Hub tabs with no content show one muted line linking to the Q&A
  Forum — the same line for Posts, Comments, Spaces, and Rewards.
- Events with nothing registered shows one muted line — "You haven't
  registered for any upcoming events yet — browse what's coming up below." —
  in place of the list.
- A calendar month with no events renders the empty grid; that's intended.
- A malformed events JSON blob logs a console warning and renders an empty
  month rather than breaking the page.

## Password reset (added in 1.3.0)

Mockup: `/reset-password` (try `?step=request`, `expired`, `sent`, `new`,
`done`). On WordPress this is **not a page you build** — `wp-login.php`
generates every screen with fixed markup (rule 10). `vantiq-login.css`
restyles that markup; the snippets below change its words and fix where it
sends people.

| Mockup step | WordPress screen | Body class |
|---|---|---|
| request | `wp-login.php?action=lostpassword` | `login-action-lostpassword` |
| expired | `…?action=lostpassword&error=expiredkey` (or `invalidkey`) | `login-action-lostpassword`, plus `#login_error` |
| sent | **a normal WordPress page** at `/check-your-email/` (see the bug below) | — |
| new | `…?action=rp&key=…&login=…` | `login-action-rp` |
| done | `…?action=resetpass` | `login-action-resetpass` |

### The bug on the live site: "it kicks me back to sign in"

After "Get New Password", WordPress redirects to
`wp-login.php?checkemail=confirm`. That URL has no `action`, and the site's
login redirect (whatever sends `wp-login.php` visits to the sign-in landing
page — a plugin or a `login_init` hook in the theme) catches it and bounces
the visitor home, so they never see "check your email". Two changes fix it:

1. **Send reset requests to a real page.** Create a WordPress page at
   `/check-your-email/` with the mockup's "Check your email" content (it's
   static copy — icon, title, "If an account exists for that email
   address…", the "Didn't get it?" tips, "Back to sign in", and "Use a
   different email" linking to `wp_lostpassword_url()`). Then:

   ```php
   add_filter('lostpassword_redirect', function () {
       return home_url('/check-your-email/');
   });
   ```

   The page never shows the email address: passing it in the URL would
   expose it, and the message must read the same whether or not the account
   exists, so nobody can use the form to check who's registered.

2. **Let the reset screens through the login redirect.** Whatever redirects
   `wp-login.php` must skip `action=lostpassword`, `action=rp` and
   `action=resetpass` (and `checkemail=confirm`, if anything still sends
   there). Otherwise the emailed link itself bounces too.

### Titles and wording

`vantiq-login.css` expects a title in the message box. WordPress has none
by default, so add one with the `login_message` filter:

```php
add_filter('login_message', function ($message) {
    $action = $_REQUEST['action'] ?? '';
    $copy = [
        'lostpassword' => ['Reset your password', "Enter the email you use for the Vantiq Community and we'll send you a link to set a new password."],
        'rp'           => ['Set a new password', "Choose a password you don't use anywhere else."],
        'resetpass'    => ['Password updated', 'Your password has been reset. Sign in with your new password to pick up where you left off.'],
    ];
    if (!isset($copy[$action])) {
        return $message;
    }
    [$title, $text] = $copy[$action];
    $html = '<div id="login-message" class="notice notice-info message' . ($action === 'resetpass' ? ' reset-pass' : '') . '">'
          . '<h2>' . esc_html($title) . '</h2><p>' . esc_html($text) . '</p>';
    if ($action === 'resetpass') {
        $html .= '<p><a href="' . esc_url(home_url('/')) . '">Sign in</a></p>';
    }
    return $html . '</div>';
});
```

And match the mockup's labels with `gettext`, limited to the login screen:

```php
add_filter('gettext', function ($translation, $text, $domain) {
    if ($domain !== 'default' || !did_action('login_init')) {
        return $translation;
    }
    $map = [
        'Username or Email Address'    => 'Email address',
        'Get New Password'             => 'Send reset link',
        'Save Password'                => 'Save password',
        'Generate Password'            => 'Generate a strong password',
        'Confirm use of weak password' => 'Use this weak password anyway',
        'Log in'                       => 'Back to sign in',
        'Register'                     => 'Create an account',
        'Your password reset link has expired. Please request a new link below.'      => 'That reset link has expired or was already used. Enter your email to get a new one.',
        'Your password reset link appears to be invalid. Please request a new link below.' => 'That reset link has expired or was already used. Enter your email to get a new one.',
    ];
    return $map[$text] ?? $translation;
}, 10, 3);
```

The strength meter's words ("Very weak", "Weak", "Medium", "Strong") are
WordPress's defaults already — no change needed. The sign-in card's "Lost
your password?" link points at `wp_lostpassword_url()`.

### Loading the CSS

```php
add_action('login_enqueue_scripts', function () {
    $base = get_stylesheet_directory_uri() . '/vantiq/';
    wp_enqueue_style('vantiq-portal', $base . 'vantiq-portal.css', [], '1.4.0');
    wp_enqueue_style('vantiq-login', $base . 'vantiq-login.css', ['vantiq-portal', 'login'], '1.4.0');
});
```

Update the logo URL at the top of `vantiq-login.css` to your uploaded
files (light and dark). For dark mode on these screens, print the same
one-line theme snippet from `shell.html` with the `login_head` hook.

### Checked, and not checked

`login.html` renders all four `wp-login.php` screens from WordPress 6.x's
markup in light, dark and at 375px. It does **not** load WordPress's own
`login.css`, so check one real screen on staging once the CSS is in —
every rule is written `body.login #login …` to outrank WordPress's styles,
but that's the one thing this page can't prove.

## Registration (added in 1.4.0)

Mockup: `/register`. The live `/register/` page (child theme template plus
`vantiq-register` in `vantiqlms.js`) already has the same fields, links and
resend panel. The mockup was brought in line with it, so **the form itself
needs no change**. The one requested change is how the two status lines look:

- `#register-response` and `#resend-response` currently show every message,
  success included, as red italic text (inline `style="color:red;
  font-style:italic"`). Drop that inline style and give each line
  `class="vq-notice"` plus a tone: `vq-notice--success` when
  `json.status == 'success'`, `vq-notice--error` for every other message.
  Put the matching icon first and the text in a `<span>`; the markup is in
  `handover.html` under "Notice". It's a class swap and an icon per branch in
  the existing success/error handlers, nothing else.
- Leave the "Sending registration..." and "Sending request..." interim text
  as it is today. (The mockup shows "Sending request…" on the Resend button
  instead; either is fine.)

Role rule: the page is for signed-out visitors only, the same for every
role. Registering doesn't sign anyone in; the account becomes active from
the validation email, as today.

Not decided in the mockup, on purpose: the live form auto-fills and locks
Company and Community role when the email's domain belongs to a known
company. The mockup has no company list to match against, so it doesn't
show that; keep the live behaviour.

## Contact Support form (added in 1.4.0)

Mockup: `/support`. Kit: `support-form.html` (the whole form, ready to copy)
and `vantiq-support.js`. This answers both requests: a form that switches
between Public Cloud, Private Cloud and Edge, keeping the shared fields and
swapping only the ones that differ, with document uploads on every
submission.

### Dropping it in

1. Copy everything from `<form>` to `</form>` in `support-form.html` into the
   Contact Support template, inside `.vq-root`. Set `action` (or your AJAX
   handler) to your own; keep `enctype="multipart/form-data"`.
2. Enqueue `vantiq-support.js` on that page only, after
   `vantiq-interface.js`:

   ```php
   wp_enqueue_script('vantiq-support', $base . 'vantiq-support.js', ['vantiq-interface'], '1.4.0', true);
   ```

3. Don't hand-edit the copied markup to change a field. The form is
   generated from `lib/support-form.json` by `scripts/gen-support-form.mjs`,
   the same field map the mockup renders. Ask for the change here and re-pull,
   so the mockup and the live form stay identical.

### What the handler receives

- Always: `first_name`, `last_name`, `email`, `reason`, and the files as
  `attachments[]` (use `$_FILES['attachments']`).
- `reason` is `technical` or `bug-report`: also `deployment` (`public`,
  `private`, `edge`) and that deployment's issue fields. `security` (staff
  only): the `security_*` fields, see "Security Issue" below. Everything
  else: `message`.
- Issue field names are the PDF templates' own form-field names
  (`customer_name`, `dtc_email`, `submission_type`, `severity`, `use_case`,
  … `server_qdrant`), so a submission maps one-to-one onto the template
  Support already uses. The full list per deployment is in
  `lib/support-form.json`.
- Only fields that apply are sent. The JS disables every field that doesn't
  apply to the chosen reason and deployment, and disabled fields are never
  posted. So an Edge report never carries an empty `github_id`.
- Checkboxes post `yes` when ticked and nothing when not. That includes the
  "…attached" ticks shown with the upload box. Each "Execution
  environment" interface is a pair: `ui_ios_selected=yes` plus the details
  text in `ui_ios`.
- Routing: Technical Support, Bug Report and Security Issue go to
  support@vantiq.com, everything else to enablement@vantiq.com. Route on the
  server from `reason`. The form doesn't show or post the mailbox.
- After submitting, show the outcome under the Send button with the
  `.vq-notice` from 1.4.0 ("Registration" above): `--success` on success,
  `--error` with the reason on failure.

### Server settings the uploads need

The form allows up to 10 files of up to 25 MB each (enforced in the browser
by `vantiq-support.js`). Check the server allows the same, or uploads fail
silently before WordPress sees them:

- PHP: `upload_max_filesize` ≥ 25M, `post_max_size` ≥ 250M (or whatever
  total you settle on), `max_file_uploads` ≥ 10.
- Any proxy or host limit in front of PHP (nginx `client_max_body_size`,
  Cloudflare's 100 MB request cap on non-Enterprise plans).
- Re-check the file type and size on the server. The browser check is only
  a convenience, and PRD SUP-01's pass criteria include a test virus file
  being blocked, which only the server can do.

### Content and data decisions (not code; Support/Enablement own these)

These are placeholders in the mockup, chosen so the form works. Each needs
an answer from Vantiq Support (who sign off SUP-04) before launch:

- **File limits and types.** 10 files, 25 MB each, and the accepted list
  (ZIP, JSON, logs/text, XML/YAML config, PDF, images, MP4/MOV/WebM) are a
  first guess. A large project export or video may need more.
- **Which fields are required.** Only what the templates mark required:
  Namespace and Project (Public Cloud), plus name, email and deployment.
  If Support wants more required (customer name, severity…), it's a
  one-line change per field in the field map.
- **Severity 1–4 has no definitions.** The templates don't say whether 1 is
  highest. Support should supply one line per level for the help text.

Everything else (fields, option lists, labels, help text, section names) is
taken from the three PDFs, checked field by field against their form-field
names: each deployment posts exactly its template's fields, nothing more.
That includes the templates' "…attached" ticks (`project_export_attached`,
`logging_output_attached`, etc.), which sit next to the upload box. The
templates' instructions to "attach to your email" are now the upload itself.
- **Salesforce case logging (SUP-02)** happens in your handler, not the
  form.

### Security Issue (Vantiq staff only)

From "VANTIQ Internal | Security Issue Submission Template" (PDF). It's a
seventh reason, **Security Issue**, not a fourth deployment: the template
itself says not to use it for public cloud, private cloud or edge issues.
Choosing it swaps in the template's eleven sections (severity and affected
user, problem area, affected device, network, what's happening, timeline,
recent changes, attachments, business impact, troubleshooting, requested
action). There's no deployment picker, and it routes to support@vantiq.com.

- **Role rule:** an `employee` or `admin` sees the Security Issue card and its
  sections; every other role sees the page without them, rest identical.
  Enforce it in PHP: print what sits between each
  `<!-- staff-only:start -->` / `<!-- staff-only:end -->` pair only for Vantiq
  staff, and reject `reason=security` from anyone else on the server. Hiding
  it with CSS or JS isn't enough.
- **Field names** are `security_` plus the template's label in snake_case
  (the PDF has no form fields of its own to borrow names from).
  Single-choice questions are radios (`security_severity`,
  `security_device_compliant`, …); "check all that apply" lists post as
  arrays (`security_problem_area[]`, `security_recent_changes[]`, …).
  Nothing is required, as in the template.
- **Email subject:** the template asks for
  `SECURITY: [Severity] [Problem Area] — [Short Description]`. Build it in
  the handler from `security_severity` (the word before " - "), the ticked
  `security_problem_area[]` values, and `security_problem_summary`.
- **Reporter:** the template treats the sender as the reporter, so the
  form's name and email are the reporter. "Affected user email" is only for
  someone else.

### Role rule and states

- Identical for every role that can open the page, except the Security
  Issue reason above (Vantiq staff only).
- Before a deployment is chosen, the issue fields are hidden behind a
  "Choose a deployment" hint. The deployment has no default on purpose.
- Switching deployment or reason never clears anything. Shared fields stay
  put, and a deployment's own fields come back with their values if the user
  switches back.
- Rejected files (wrong type, too big, over the count) are listed in a
  `.vq-notice--error` above the file list; accepted ones are kept.
- `vantiq-support.js` is required on this page. Without it all three
  deployments' required fields are required at once and the form can't be
  sent.

### Checked, and not checked

`support-form.html` (kit CSS only) and `/support` (mockup) were both checked
in light, dark and at 375px: field sets per deployment are identical, values
survive switching, only applicable fields are posted, and the file limits
reject what they should. Submitting `support-form.html` prints what would be
posted instead of posting it. Not checked: a real WordPress submit with
files, which depends on the server settings above.

## Known gaps in this version (1.4.0, 2026-10-20)

- Several icons in `shell.html` and `handover.html` are labeled
  `<!-- placeholder -->` — simplified shapes, not the exact `lucide-react`
  path data. The one exact, verified path (`handshake`, for Sales Hub) is
  marked as such. Swap the rest for the real paths from the running app when
  pixel-parity on icons matters.
- The Q&A Forum, Solutions Showcasing, and the Developer Hub reference pages
  (API References, Code Recipes, etc.) don't have `vantiq-<page>.js` files
  yet. Their search/filter controls are still mockup-only.

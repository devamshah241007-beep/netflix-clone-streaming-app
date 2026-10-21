from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("file:///app/public/index.html")
    page.wait_for_timeout(500)

    # Bypass authentication
    page.evaluate("""() => {
        localStorage.setItem('authToken', 'test-token');
        localStorage.setItem('currentProfile', JSON.stringify({name: 'Test', avatar: 'https://via.placeholder.com/40'}));
    }""")
    page.reload()
    page.wait_for_timeout(500)

    # Wait for the profile screen to appear and click a profile to clear it
    try:
        page.wait_for_selector('.profile-card', timeout=5000)
        page.click('.profile-card')
        page.wait_for_timeout(500)
    except:
        print("Profile card not found or already bypassed.")

    # Wait for main content to load
    page.wait_for_selector('#mainContent')
    page.wait_for_timeout(500)

    # Open player modal to verify the close button
    page.evaluate("document.getElementById('playerModal').classList.remove('hidden')")
    page.wait_for_timeout(500)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)  # Hold final state for the video

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
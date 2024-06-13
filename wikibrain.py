# SPDX-FileCopyrightText: 2024 Jyotiraditya Vedant Saraswat <khushsaraswat@gmail.com>
#
# SPDX-License-Identifier: GPL-3.0-or-later

import wikipediaapi


def get_page_links(page_title):
    # Specify the user agent (you can customize it, but be sure to follow Wikipedia's user agent policy)
    user_agent = "Mozilla/5.0"

    # Create a Wikipedia API object with the specified user agent
    wiki_wiki = wikipediaapi.Wikipedia('en', extract_format=wikipediaapi.ExtractFormat.WIKI,
                                       headers={'User-Agent': user_agent})

    # Get the Wikipedia page
    page = wiki_wiki.page(page_title)

    # Check if the page exists
    if page.exists():
        # Get all the hyperlinks on the page
        links = [link.title for link in page.links.values()]

        return links
    else:
        print(f"The Wikipedia page for '{page_title}' does not exist.")
        return []


if __name__ == "__main__":
    #print("Enter page title")
    #page_title = input()
    page_title = "Miss Meyers"
    page_links = get_page_links(page_title)

    if page_links:
        print(f"Hyperlinks in the '{page_title}' Wikipedia page:")
        for link in page_links:
            print(link)
    try: 
      import simplejson as json
    except:
      import json
    print(json.dumps(page_links))

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(page_links, f, ensure_ascii=False, indent=4)

__ = 4
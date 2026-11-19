import requests
from bs4 import BeautifulSoup
from collections import Counter

url = "https://notify.domains/"

def start(url):

    source_code = requests.get(url).text
    soup = BeautifulSoup(source_code, 'html.parser')

    wordlist = []

    for each_text in soup.find_all('div', {'class': 'entry-content'}):
        content = each_text.text

        words = content.lower().split()

        for each_word in words:
            wordlist.append(each_word)

    clean_wordlist(wordlist)
def clean_wordlist(wordlist):

    clean_list = []
    symbols = "!@#$%^&*()_-+={[}]|\\;:\"<>?/.,"

    for word in wordlist:
        for symbol in symbols:
            word = word.replace(symbol, '')

        if len(word) > 0:
            create_dictionary(clean_list)

def create_dictionary(clean_list):

    word_count = Counter(clean_list)

    top = word_count.most_common(10)

    print("Top 10 most frequent words:")
    for word, count in top:
        print(f'{word}: {count}')

if __name__ == "__main__":
    start(url)
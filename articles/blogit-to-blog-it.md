blogit: A Complete Guide

Running a personal website should be an easy task. Unfortunately, a big
hindrance for that is that there aren't many "suckless" blogging system. 
[blogit](https://pedantic.software/git/blogit) is the closest in terms of 
simplicity and minimalism to perfection. This article would be an end-all be-all
guide to effectively install blogit into your own website.

# Installation
blogit advertises itself as a small static blog generator, and indeed the whole
project is comprises of a single script file. To install this file, first
navigate to your website's git directory then wget said script:
```
$ cd proj/website/
$ wget https://pedantic.software/git/blogit/raw/27d3f06259e83df2fed6fec7bbe77ac6b917eee7/blogit
$ chmod +x blogit
```
This might seem weird having a script in the home directory of your website, but
I couldn't find a better place to put it, especially when editing the actual is
dependent on each website setup (as seen later on).

blogit initializes the basic operational structure with the following command:
```
$ ./blogit init
```

It is useful to let blogit build automatically every git commit, so let's
configure that:
```
$ touch .git/hooks/pre-commit
$ chmod +x .git/hooks/pre-commit
$ echo "$!/bin/sh" > .git/hooks/pre-commit
$ echo "./blogit build" > .git/hooks/pre-commit
```
Then, open the "blogit" script with a text editor, search for "exclude" and
delete the line where it output "blog" to git exclude. This functionality is
meant for systems where the website's root is not the same as blogit's root.

# Configuration
blogit uses the file "config" in $(pwd) for its settings, so let's create it:
```
$ touch config
```

To get the list of settings available, run:
```
$ head -n 18 blogit
```

For my use case, this is what I set it up as:
```
BLOG_DATE_FORMAT:=%Y/%m/%d %H:%M
BLOG_DATE_FORMAT_INDEX:=%Y/%m/%d
BLOG_TITLE:=ayham's blog
BLOG_DESCRIPTION:=probably interesting stuff
BLOG_URL_ROOT:=articles.ayham.xyz
BLOG_FEED_MAX:=20
BLOG_FEEDS:=rss atom
BLOG_SRC:=articles
```
Everything should be self explainatory, except probably for "BLOG_FEED*".
"BLOG_FEED_MAX" specifies the amount of rss and atom entries to generate,
whereas "BLOG_FEEDS" specify feed formats to generate.

The script can be molded for each case, exampels of doing this is explained
later on.

# Building, and the Tag System
Setting tagging for each article is super easy in blogit. For every article,
let's say "first-article.md" in "$(website)/articles/" should have the adjacent
file in "$(website)/tags/" with the name "first-article" (notice, without the
file extension). For example the file contents of
"$(website)/tags/first-article" would be:
```
TAG1 TAG2 TAG3
```
It should be noted that with my testing I noticed that the tags are being
deleted when running "./blogit clean". This is probably a bug?

Finally, to build your blog:
```
$ ./blogit build
```
Now you should be able to navigate to "$(website)/blog/index.html". Congratz!

# Miscellaneous 
Because blogit is a very small script, we can easily edit it to make add
features or to add complex styling functionality.

As done earlier, removing the git exclude is a basic recommended edit for the
script.

A more visible example is the order of HTML aggregation. For example, this 
website has its "article_list_header.html" coming before the tag list. The
article list header file includes the big article seen on the [index
page](blog.ayham.xyz), which comes before the tag list. To do this you can edit
the "blog/index.html:" section in the blogit script.
```
...
blog/index.html: $(ARTICLES) $(TAGFILES) $(addprefix templates/,$(addsuffix .html,header index_header tag_list_header tag_entry tag_separator tag_list_footer article_list_header article_entry article_separator article_list_footer index_footer footer))
	mkdir -p blog
	TITLE="$(BLOG_TITLE)"; \
	export TITLE; \
	envsubst < templates/header.html > $@; \
	envsubst < templates/index_header.html >> $@; \
	envsubst < templates/article_list_header.html >> $@; \
	envsubst < templates/tag_list_header.html >> $@; \
	first=true; \
	for t in $(shell cat $(TAGFILES) | sort -u); do \
		"$$first" || envsubst < templates/tag_separator.html; \
		NAME="$$t" \
		URL="@$$t.html" \
		envsubst < templates/tag_entry.html; \
		first=false; \
	done >> $@; \
	envsubst < templates/tag_list_footer.html >> $@; \
	first=true; \
	for f in $(ARTICLES); do \
...
```

# Conclusion
Go get a website, and set up blogit.
Contact me? [here](ayham.xyz/contact.htm)

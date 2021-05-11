SHELL := /bin/bash
prefix = /opt/allweb
init-d = /etc/init.d/
systemdir = /usr/lib/systemd/system/

.ONESHEL:
.PHONY: install

install:
	mkdir -p $(DESTDIR)${prefix}
	mkdir -p $(DESTDIR)${init-d}
	mkdir -p $(DESTDIR)$(systemdir)
	####-anchor-[node-version]-[makefile]
	cp -a $(CURDIR)/node-linux $(DESTDIR)${prefix}
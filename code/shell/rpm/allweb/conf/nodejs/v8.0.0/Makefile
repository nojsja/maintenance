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
	if [ -e $(CURDIR)/node-8.0.0-linux ]; then cp -a $(CURDIR)/node-8.0.0-linux $(DESTDIR)${prefix}; fi
	if [ -e $(CURDIR)/node-12.0.0-linux ]; then cp -a $(CURDIR)/node-12.0.0-linux $(DESTDIR)${prefix}; fi
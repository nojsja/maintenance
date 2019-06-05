SHELL := /bin/bash
prefix = /opt/allweb
init-d = /etc/init.d/

.ONESHEL:
.PHONY: install

install:
	mkdir -p $(DESTDIR)${prefix}
	mkdir -p $(DESTDIR)${init-d}
	cp -a $(CURDIR)/node-express-react $(DESTDIR)${prefix}
	cp -a $(CURDIR)/web $(DESTDIR)${prefix}
	cp -a $(CURDIR)/mongodb-linux-x86_64-rhel70-3.6.4 $(DESTDIR)${prefix}
	cp -a $(CURDIR)/node-v8.11.1-linux-x64 $(DESTDIR)${prefix}
	cp -a $(CURDIR)/node-express-react/scripts/etc/frontend $(DESTDIR)/etc/
	cp -a $(CURDIR)/node-express-react/scripts/frontend $(DESTDIR)/etc/init.d/

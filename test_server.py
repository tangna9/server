#!/usr/bin/env python
#encoding:utf8
__author__ = tangna
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os
from common import *
import urllib2
from tornado.options import define, options
from config import *
define("port", default=8010, help="run on the given port", type=int)


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", IndexHandler),
            (r"/history/", HistoryHandler),
        ]
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            debug=True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):

        type_id = self.get_argument("choice", "0")
        type_id2 = self.get_argument("add_choice", "0")
        data_id = self.get_argument("data_id", '')
        name = self.get_argument("name", '')
        command = self.get_argument("command", '')
        is_on = self.get_argument("is_on", '')
        status = self.get_argument("status", '')
        host_url = self.get_argument("host_url", '')
        check_type = self.get_argument("check_type", '')
        url = self.get_argument("url", '')
        expected_result = self.get_argument("expected_result", '')
        email = self.get_argument("email", '')
        n_name = self.get_argument("n_name", '')
        n_command = self.get_argument("n_command", '')
        n_check_type = self.get_argument("n_check_type", '')
        n_is_on = self.get_argument("n_is_on", '1')

        if type_id2 == "4": #新建
            if not check_type or not expected_result:
                check_type, expected_result = "-1", "-1"
            insert_data_web(n_name, n_command, check_type, n_is_on, url, expected_result, email)
            self.redirect('/')
            return
        if type_id2 == "2": #修改
            if not check_type or not expected_result:
                check_type, expected_result = "-1", "-1"
            update_data_web(data_id, n_name, n_command, check_type, n_is_on, url, expected_result, email)
            self.redirect('/')
            return

        if type_id == "0":  #初始页面展示全部数据
            o_result = show_all_data_web()
            result1 = []
            result = []
            for item in o_result:
                result1.append(mapping_type(item, MAP_TYPE, 3))
            for item in result1:
                result.append(mapping_type(item, MAP_ON, 4))


        elif type_id == "1":  #查询
            o_result = search_data_web(name, command, is_on, status, host_url)
            result1 = []
            result = []
            for item in o_result:
                result1.append(mapping_type(item, MAP_TYPE, 3))
            for item in result1:
                result.append(mapping_type(item, MAP_ON, 4))

        elif type_id == "6": #删除
            delete_data_web(data_id)
            result = show_all_data_web()

        self.render("index.html",
                    page_title="服务器监控",
                    header_text="服务器监控",
                    p_result=result, switch=is_on, command=command, type_id=type_id, name=name, choice=type_id,
                    status=status, check_type=check_type, url=url, expected_result=expected_result, email=email,
                    is_on=is_on,
                    add_choice=type_id2,
                    n_name=n_name,
                    n_command=n_command,
                    n_check_type=n_check_type,
                    n_is_on=n_is_on,
                    data_id=data_id,
                    host_url=host_url
                    )

class HistoryHandler(tornado.web.RequestHandler):
    def get(self):
        history_id = self.get_argument("history_id", "")
        print "history_id", history_id
        p_result = show_history_web(history_id)
        self.render("page1.html", history_id=history_id, p_result=p_result)


if __name__ == "__main__":
    print options.port
    # exit
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
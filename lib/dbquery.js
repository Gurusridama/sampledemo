var configdata = require('../config/config');
var mysql = require('mysql');

exports.getdata=function(req,request,referenceKey,cb)
{
	var sql = "";
	if(referenceKey=='getcustomerdata')
	{
		sql="SELECT * FROM `customers`";
	}
	/*if(referenceKey=='getcustomer')
	{
		sql="SELECT * FROM `customers` where ID="+id;
	}

	if(referenceKey=='getonecustomerdata')
	{
		sql="SELECT * FROM `customers` limit 0,1";
	}*/

	request.query(sql, function(err,res){
		cb(res);
	});
}


exports.getperticulardata=function(req,request,methodname,cb)
{
	var sql = "";
	if(methodname=='getcustomer')
	{
		var customer_id=(typeof(req.query.id)!=='undefined')?req.query.id:'null';

		sql="SELECT * FROM `customers` where ID='"+customer_id+"'";
	}
	request.query(sql, function(err,res){
		cb(res);
	});
}

exports.postdata=function(req,request,methodname,cb)
{
	var sql = "";
	if(methodname=='postcustomer')
	{
		var data = JSON.parse(Object.keys(req.body));

		var name=(typeof(data.cname)!=='undefined')?data.cname:"null";
		var age=(typeof(data.age)!=='undefined')?data.age:"null";
		var address=(typeof(data.address)!=='undefined')?data.address:"";
		var salary=(typeof(data.salary)!=='undefined')?data.salary:"";

		sql="insert into `customers`(NAME,AGE,ADDRESS,SALARY) values('"+name+"','"+age+"','"+address+"','"+salary+"')";
	}
	if(methodname=='likes')
	{
		var id=req.query.user_id;
		var sql_sel="select * from customers where ID='"+id+"' ";
		request.query(sql_sel, function(err,selres){
			if(selres.length>0)
			{
				var like_count=selres[0].likes+1
				sql_update="update customers set likes='"+like_count+"' where ID='"+id+"'";
				request.query(sql_update, function(err,res){
					
				});

			}
		});
	}
	if(methodname=='dislikes')
	{
		var id=req.query.user_id;
		var sql_sel="select * from customers where ID='"+id+"' ";
		request.query(sql_sel, function(err,selres){
			if(selres.length>0)
			{
				var dislike_count=selres[0].dislikes+1
				sql_update="update customers set dislikes='"+dislike_count+"' where ID='"+id+"'";
				request.query(sql_update, function(err,res){
					
				});

			}
		});
	}

	request.query(sql, function(err,res){
		if(res)
		{
			cb(res);
		}
		else
		{
			cb("ok");
		}
		
	});

}
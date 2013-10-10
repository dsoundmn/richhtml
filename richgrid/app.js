example = {}
$(document).ready(function() { 
	
	//lets set debug mode to 3 (highest level)
	//set to 1 for only critical errors
	RichHTML.debugLvl = 3;
	
	example.grid1 = new RichHTML.grid({
		el: "example-customer-grid",
		url:'code/actions/getCustomers.php',
		root: 'customers',
		totalProperty : 'totalcount',
		columns: [{
	            id: 'customer_id', 
	            dataIndex : "customer_id",
	            hidden:true
	        },{
			text:     	"First Name",
            dataIndex:  "first_name"
		},{
				text:     	"Last Name",
                dataIndex:  "last_name"
                
		},{
				text:	"Created On",
				dataIndex: "create_date"				
		}]
	});
	
	example.grid2 = new RichHTML.grid({
		el: "example-customer-grid",
		url:'code/actions/getCustomers.php',
		root: 'customers',
		totalProperty : 'totalcount',
		columns: [{
				text: "",
				dataIndex: "address",
				xtype: "expander",
				renderer: function(text,row, el) {
					var extraInfo = "<b>Address</b>: "+row.address+" "+row.postal_code+"<br/>";
					extraInfo += "<b>E-mail</b>: "+row.email+"<br/>";
					extraInfo += "<b>Phone</b>: "+row.phone+"<br/>";
					return extraInfo;
				}
			},{          
                text:     	"",            
                xtype:      "drag"            
            },{
	            text:       "",
	            dataIndex:  "customer_id",            
	            xtype:      "checkbox"           
	        },{
	            id: 'customer_id', 
	            dataIndex : "customer_id",
	            hidden:true
	        },
			{
                text:     	"Full Name",
                dataIndex:  "last_name",
                align: 		"left",
                renderer:   function(text,row,el) {
                	el.addClass ='exampleclass';
                	return row.last_name + ", " + row.first_name;	
                },
                sortable:   true         
            },{
				text:	"Created On",
				dataIndex: "create_date",
                align: "center",
                width: "180",
                sortable:   true  			
		}]
	});
	
	example.grid4 = new RichHTML.grid({
		el: "example-customer-grid",
		url:'code/actions/getCustomers.php',
		root: 'customers',
		totalProperty : 'totalcount',
		columns: [{
		    text: "",
		    dataIndex: "address",
		    xtype: "expander"
		},{          
		    text:       "",            
		    xtype:      "drag"           
		},{
		    text:       "",
		    dataIndex:  "customer_id",            
		    xtype:      "checkbox"          
		},{
		    id:         'customer_id', 
		    dataIndex:  "customer_id",
		    hidden:     true
		},{
		    text:       "First Name",
		    dataIndex:  "first_name",
		    align:      "left",
		    sortable:   true                                 
		},{
		    text:       "Last Name",
		    dataIndex:  "last_name",
		    align:      "left",
		    sortable:   true                                                 
		},{
		    text:       "Created On",
		    dataIndex:  "create_date",
		    align:      "center",
		    width:      "180",
		    sortable:   true                                                               
		}]
	});
	
	example.grid3 = new RichHTML.grid({
		el: "example-customer-grid2",
		url:'code/actions/getCustomers.php',
		root: 'customers',
		totalProperty : 'totalcount',
		columns: [{
				text: "",
				xtype: "expander",
				renderOnExpand: true,
				renderer: renderExpander
			},{          
                text:     	"",            
                xtype:      "drag"            
            },{
	            text:       "",
	            dataIndex:  "customer_id",            
	            xtype:      "checkbox"           
	        },{
	            id: 'customer_id', 
	            dataIndex : "customer_id",
	            hidden:true
	        },
			{
                text:     	"Full Name",
                dataIndex:  "last_name",
                align: 		"left",
                renderer:   function(text,row,el) {
                	el.addClass ='exampleclass';
                	return row.last_name + ", " + row.first_name;	
                },
                sortable:   true         
            },{
				text:	"Created On",
				dataIndex: "create_date",
                align: "center",
                width: "180",
                sortable:   true  			
		}]	
	});
	
	example.finalgrid = new RichHTML.grid({
		el:'example-customer-grid',	
		url:'code/actions/getCustomers.php',
		baseParams: {
			sort: 'last_name',
			dir : 'asc', // or 'desc'
			limit: 10
        },
		root: 'customers',
		totalProperty : 'totalcount',	
		columns: [{
				text: "",
				dataIndex: "address",
				xtype: "expander",
				renderOnExpand : true,
				renderer: renderExpander
			},{          
                text:     	"",            
                xtype:      "drag"            
            },{
                text:     	"",
                dataIndex:  "customer_id",            
                xtype:      "checkbox"            
            },{
	            id: 'customer_id', 
	            dataIndex : "customer_id",
	            hidden:true
	        },
			{
                text:     	"Full Name",
                dataIndex:  "last_name",
                align: 		"left",
                renderer:   function(text,row,el) {
                	el.addClass ='exampleclass';
                	return row.last_name + ", " + row.first_name;	
                },
                sortable:   true         
            },
            {
                text:     	"Email",
                dataIndex:  "email",
                align: 		"right",
                sortable:   true                           
            },
            {
            	text: 		"Created On",
            	dataIndex:	"create_date",
            	align: 		"center",
            	sortable: 	true,
                width: 		"180"
            }

        ], 	
    });
    
	$(example.finalgrid).bind({	
			"load" : function(event,data) {
			    var paging = "Displaying customers "+(data.paging.start + 1)+" - "+(data.paging.start + data.paging.items)+" of "+data.paging.totalItems;		    
				$('#tablemetadata').html(paging);
		    },
		    "rowselect": function(event,data) {
				alert('selected id:'+data.rowid);
		    },
	        "drop": function (event, data) {
				alert('new order:'+example.finalgrid.getRowValues('customer_id'))        
	        }
	    });    
    
	function renderExpander(value,record,el){
    	$.ajax({
		  url: 'code/actions/getCustomerAddress.php',
		  dataType: 'json',
		  async: false,
		  data: {customer_id:record.customer_id},
		  success: function(data) {	
		  	 html = "<div style='float:left;'><img width='55px' height='55px' src='profile.jpg' /></div>";
			 html += "<div style='margin-bottom:15px;padding-left:70px;margin-top: 10px;padding-top: 5px;'><b>Address</b>: "+data.address.address+" "+data.address.postal_code+"<br/>";
			 html += "<b>E-mail</b>: "+data.address.email+"<br/>";
			 html += "<b>Phone</b>: "+data.address.phone+"</div>";
		  }
		});			
		return html;			  
    }    
	
});
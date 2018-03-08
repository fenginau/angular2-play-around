declare @i int = 1


while @i < 200 begin
	
	INSERT INTO UR_COMPANY (COMPANY_NAME,COMPANY_ADDRESS,COMPANY_EMAIL,COMPANY_PHONE1,COMPANY_PHONE2,COMPANY_ABN,COMPANY_ACN) values ('c' + cast(@i as nvarchar(10)), 'add' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '@' + cast(@i as nvarchar(10)) + '.com', cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)))
	INSERT INTO UR_CONTACT (CONTACT_NAME,CONTACT_ADDRESS,CONTACT_EMAIL,CONTACT_PHONE1,CONTACT_PHONE2,COMPANY_ID) VALUES ('contact' + cast(@i as nvarchar(10)), 'address' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '@' + cast(@i as nvarchar(10)) + '.com', cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), @i)
	
	set @i = @i + 1
end






